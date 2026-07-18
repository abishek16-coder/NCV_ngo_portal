import { NextResponse } from "next/server";
import { destroySession, getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/utils/api-error";

export async function POST() {
  try {
    const session = await getSession();

    if (session) {
      await prisma.auditLog.create({
        data: {
          userId: session.userId,
          action: "LOGOUT",
          entity: "User",
          entityId: session.userId,
        },
      });
    }

    await destroySession();

    return NextResponse.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return handleApiError(error);
  }
}
