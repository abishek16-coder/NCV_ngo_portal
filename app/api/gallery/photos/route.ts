import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/auth";
import { handleApiError } from "@/utils/api-error";

const createPhotoSchema = z.object({
  url: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
  alt: z.string().optional(),
  caption: z.string().optional(),
  album: z.string().optional(),
  isFeatured: z.boolean().optional(),
  orderIndex: z.number().int().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const album = searchParams.get("album");
    const featured = searchParams.get("featured");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "24");

    const where: Record<string, unknown> = {};
    if (album) where.album = album;
    if (featured === "true") where.isFeatured = true;

    const [photos, total] = await Promise.all([
      prisma.galleryPhoto.findMany({
        where,
        orderBy: [{ orderIndex: "asc" }, { createdAt: "desc" }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.galleryPhoto.count({ where }),
    ]);

    const albums = await prisma.galleryPhoto.findMany({
      select: { album: true },
      distinct: ["album"],
      where: { album: { not: null } },
    });

    return NextResponse.json({
      success: true,
      data: photos,
      albums: albums.map((a) => a.album).filter(Boolean),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireRole("SUPER_ADMIN", "CONTENT_MANAGER");
    const body = await request.json();
    const data = createPhotoSchema.parse(body);

    const photo = await prisma.galleryPhoto.create({ data });
    return NextResponse.json({ success: true, data: photo }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
