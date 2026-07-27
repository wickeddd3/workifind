import { NextResponse } from "next/server";

import { checkDatabaseConnection } from "@/shared/lib/db-health";

// Never cache: probes must reflect the live state on every request.
export const dynamic = "force-dynamic";

/**
 * Liveness/readiness probe for load balancers, orchestrators, and uptime
 * monitors. Returns 200 when the app can reach the database, 503 otherwise.
 */
export async function GET() {
  const isUp = await checkDatabaseConnection();

  return NextResponse.json(
    {
      status: isUp ? "ok" : "error",
      database: isUp ? "up" : "down",
      timestamp: new Date().toISOString(),
    },
    { status: isUp ? 200 : 503 },
  );
}
