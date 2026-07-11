import { NextResponse } from "next/server";

import prisma from "@/shared/lib/prisma";

// Never cache: probes must reflect the live state on every request.
export const dynamic = "force-dynamic";

/**
 * Liveness/readiness probe for load balancers, orchestrators, and uptime
 * monitors. Returns 200 when the app can reach the database, 503 otherwise.
 */
export async function GET() {
  try {
    // Cheap round-trip that confirms the DB connection is usable.
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      { status: "ok", database: "up", timestamp: new Date().toISOString() },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      {
        status: "error",
        database: "down",
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    );
  }
}
