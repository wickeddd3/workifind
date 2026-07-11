// Isomorphic structured logger. Works on the server and in the browser.
// - Production: emits single-line JSON so log platforms (Vercel, Datadog, …)
//   can parse and index it.
// - Development: human-readable output.
// Errors also flow through `captureException`, the single integration point
// for an external error tracker (e.g. Sentry) — a no-op until one is wired up.

type LogLevel = "debug" | "info" | "warn" | "error";
type LogContext = Record<string, unknown>;

const isProduction = process.env.NODE_ENV === "production";

function serializeError(error: unknown) {
  if (error instanceof Error) {
    return { name: error.name, message: error.message, stack: error.stack };
  }
  return { message: String(error) };
}

function emit(level: LogLevel, message: string, context?: LogContext) {
  // Debug is noise in production.
  if (level === "debug" && isProduction) return;

  const consoleFn =
    level === "error"
      ? console.error
      : level === "warn"
        ? console.warn
        : console.log;

  if (isProduction) {
    consoleFn(
      JSON.stringify({
        level,
        message,
        time: new Date().toISOString(),
        ...context,
      }),
    );
  } else {
    consoleFn(`[${level}] ${message}`, context ?? "");
  }
}

/**
 * Integration point for an external error tracker. To enable Sentry:
 *   import * as Sentry from "@sentry/nextjs";
 *   Sentry.captureException(error, { extra: { message, ...context } });
 */
function captureException(
  _error: unknown,
  _message?: string,
  _context?: LogContext,
) {
  // Intentionally a no-op until an error tracker is configured.
}

export const logger = {
  debug: (message: string, context?: LogContext) =>
    emit("debug", message, context),
  info: (message: string, context?: LogContext) =>
    emit("info", message, context),
  warn: (message: string, context?: LogContext) =>
    emit("warn", message, context),
  error: (message: string, error?: unknown, context?: LogContext) => {
    emit("error", message, {
      ...context,
      ...(error !== undefined && { error: serializeError(error) }),
    });
    captureException(error, message, context);
  },
};
