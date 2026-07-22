import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { handleApiError, notFound } from "@/utils/api-error";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireRole("SUPER_ADMIN", "CONTENT_MANAGER");
    const { slug } = await params;
    const event = await prisma.event.findUnique({ where: { slug } });
    if (!event) throw notFound("Event");

    const registrations = await prisma.eventRegistration.findMany({
      where: { eventId: event.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: registrations });
  } catch (error) {
    return handleApiError(error);
  }
}
