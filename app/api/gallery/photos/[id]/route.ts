import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { handleApiError, notFound } from "@/utils/api-error";

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("SUPER_ADMIN", "CONTENT_MANAGER");
    const { id } = await params;
    const photo = await prisma.galleryPhoto.findUnique({ where: { id } });
    if (!photo) throw notFound("Photo");

    await prisma.galleryPhoto.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Photo deleted" });
  } catch (error) {
    return handleApiError(error);
  }
}
