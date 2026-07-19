import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { handleApiError, notFound } from "@/utils/api-error";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await params;
    const body = await request.json();

    const message = await prisma.contactMessage.findUnique({ where: { id } });
    if (!message) throw notFound("Message");

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { isRead: body.isRead },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await params;
    const message = await prisma.contactMessage.findUnique({ where: { id } });
    if (!message) throw notFound("Message");

    await prisma.contactMessage.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Message deleted" });
  } catch (error) {
    return handleApiError(error);
  }
}
