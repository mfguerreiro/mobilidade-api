
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import env from 'dotenv';
env.config();

const sentryVar = process.env.SERVER_SENTRY || "https://5486387816ff441494ac7ece70b8093a@o970976.ingest.sentry.io/5922969";

Sentry.init({
  dsn: sentryVar,
  tracesSampleRate: 1.0,
});

export default Sentry;