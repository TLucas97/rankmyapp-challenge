import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  tracesSampleRate: 0,

  environment: process.env.NODE_ENV || "development",

  beforeSend(event) {
    if (event.exception) {
      return event;
    }
    return null;
  },
});

