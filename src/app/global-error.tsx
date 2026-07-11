"use client";

import { useEffect } from "react";

/**
 * Catches errors thrown by the root layout itself. It replaces the entire
 * document, so it renders its own <html>/<body> and avoids app CSS/components
 * (which may be exactly what failed). Keep it self-contained.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "1rem",
          textAlign: "center",
          fontFamily: "system-ui, sans-serif",
          color: "#0f172a",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
          Something went wrong
        </h1>
        <p style={{ maxWidth: "28rem", color: "#475569" }}>
          A critical error occurred. Please try again.
        </p>
        {error.digest && (
          <p style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
            Reference: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          style={{
            marginTop: "0.5rem",
            borderRadius: "0.375rem",
            border: "none",
            backgroundColor: "#10b981",
            padding: "0.5rem 1rem",
            fontWeight: 600,
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
