# notification-service
Notification Service (Push, Email, SMS)


✅ Purpose: Send emails, SMS, and push notifications.
✅ Tech Stack: Twilio, AWS SNS, Firebase, Mailgun, SendGrid.
✅ Endpoints:

/send-email

/send-sms

/send-push

Reference: https://medium.com/@dviniukov/building-a-scalable-notification-microservice-with-nestjs-email-sms-and-push-7b21bc236562

## For a production-level notification service, you should build it to be scalable, decoupled, retry-safe, and channel-agnostic. Here's how to approach it:

### Features
- queue based  (Redis + BullMQ / RabbitMQ / Kafka)
- multi-channel support (Email, SMS, Push, Web, In-app) 
- retry logic   (Dead-letter queues, retry strategies)
- template management (Handlebars, MJML, or CMS-based (Strapi, etc.))
- audit log / tracking (Logs + DB table (status, attempts, success/fail))
- rate limiting (Redis + job throttling)
- multitenancy (optional)  (Use tenant ID in messages)
- Failover/backup channel  (e.g. fallback from email to SMS)

### SMS payload sample 
    {
    "type": "email",
    "to": "user@example.com",
    "template": "order_confirmation",
    "data": {
        "username": "Shailesh",
        "orderId": "ABC123"
    },
    "retry": 3,
    "priority": "high",
    "tenantId": "t-001"
    }

### Architecture overview
    Frontend → (API Gateway) → Notification Producer (sends job)
                                  ↓
                             Redis Queue (BullMQ)
                                  ↓
               Notification Worker (NestJS) → Email/SMS Provider
                                           ↳ Logs to DB
### Tech Stack
    | Component             | Tool/Library                                |
    | --------------------- | ------------------------------------------- |
    | **Queue Engine**      | Redis + BullMQ (Node.js / NestJS), or Kafka |
    | **Email Provider**    | Resend, Brevo, Mailgun, Postmark, SES       |
    | **SMS Provider**      | Twilio, MessageBird, Gupshup                |
    | **Push**              | Firebase Cloud Messaging, OneSignal         |
    | **Template Engine**   | Handlebars / MJML                           |
    | **DB**                | PostgreSQL (notification logs, metadata)    |
    | **Service Framework** | NestJS Microservice                         |



### Templates for email, push, sms
