import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'

Sentry.init({
  dsn: '',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 0.25
})

export const sentry = Sentry
