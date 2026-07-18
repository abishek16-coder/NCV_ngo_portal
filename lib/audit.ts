import { prisma } from "./prisma";
import { headers } from "next/headers";
import { getSession } from "./auth";

export async function createAuditLog(
  action: string,
  entity?: string,
  entityId?: string,
  details?: string
) {
  try {
    const session = await getSession();
    if (!session) return;

    const headersList = await headers();
    const ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action,
        entity,
        entityId,
        details: details ? JSON.stringify(details) : null,
        ipAddress,
      },
    });
  } catch (error) {
    console.error("Failed to create audit log:", error);
  }
}
