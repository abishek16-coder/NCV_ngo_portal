import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { handleApiError } from "@/utils/api-error";

const createVideoSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
  description: z.string().optional(),
  platform: z.string().optional(),
  isFeatured: z.boolean().optional(),
  orderIndex: z.number().int().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    const where: Record<string, unknown> = {};
    if (featured === "true") where.isFeatured = true;

    const videos = await prisma.galleryVideo.findMany({
      where,
      orderBy: [{ orderIndex: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ success: true, data: videos });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireRole("SUPER_ADMIN", "CONTENT_MANAGER");
    const body = await request.json();
    const data = createVideoSchema.parse(body);

    const video = await prisma.galleryVideo.create({ data });
    return NextResponse.json({ success: true, data: video }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
