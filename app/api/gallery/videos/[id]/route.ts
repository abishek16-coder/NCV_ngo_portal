import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { handleApiError, notFound } from "@/utils/api-error";

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("SUPER_ADMIN", "CONTENT_MANAGER");
    const { id } = await params;
    const video = await prisma.galleryVideo.findUnique({ where: { id } });
    if (!video) throw notFound("Video");

    await prisma.galleryVideo.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Video deleted" });
  } catch (error) {
    return handleApiError(error);
  }
}
