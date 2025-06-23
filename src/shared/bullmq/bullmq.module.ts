import { Module, DynamicModule, Global } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({})
export class BullMQModule {
  static forRoot(): DynamicModule {
    return {
      module: BullMQModule,
      imports: [
        BullModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            redis: {
              host: configService.get('REDIS_HOST', 'localhost'),
              port: parseInt(configService.get('REDIS_PORT', '6379')),
              password: configService.get('REDIS_PASSWORD', undefined),
              username: configService.get('REDIS_USERNAME', undefined),
              db: parseInt(configService.get('REDIS_DB', '0')),
            },
            defaultJobOptions: {
              attempts: parseInt(configService.get('BULL_DEFAULT_ATTEMPTS', '3')),
              backoff: {
                type: configService.get('BULL_BACKOFF_TYPE', 'exponential'),
                delay: parseInt(configService.get('BULL_BACKOFF_DELAY', '5000')),
              },
              removeOnComplete: configService.get('BULL_REMOVE_ON_COMPLETE', 'true') === 'true',
              removeOnFail: configService.get('BULL_REMOVE_ON_FAIL', 'false') === 'true',
              timeout: parseInt(configService.get('BULL_JOB_TIMEOUT', '30000')),
            },
            prefix: configService.get('BULL_PREFIX', 'bull'),
          }),
        }),
      ],
      exports: [BullModule],
    };
  }

  static forFeature(queues: string[]): DynamicModule {
    return {
      module: BullMQModule,
      imports: [
        BullModule.registerQueue(
          ...queues.map(queue => ({
            name: queue,
          })),
        ),
      ],
      exports: [BullModule],
    };
  }
}