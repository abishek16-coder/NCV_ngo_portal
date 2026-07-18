import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/auth";
import { handleApiError, badRequest, notFound } from "@/utils/api-error";
import { CmsPageStatus } from "@prisma/client";

const createPageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  content: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  status: z.nativeEnum(CmsPageStatus).optional(),
  orderIndex: z.number().int().optional(),
});

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as CmsPageStatus | null;
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};

    if (status) {
      if (!Object.values(CmsPageStatus).includes(status)) {
        throw badRequest("Invalid status value");
      }
      where.status = status;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
      ];
    }

    const pages = await prisma.cmsPage.findMany({
      where,
      orderBy: { orderIndex: "asc" },
      include: {
        _count: { select: { versions: true } },
      },
    });

    return NextResponse.json({
      success: true,
      data: pages,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireRole("SUPER_ADMIN", "CONTENT_MANAGER");

    const body = await request.json();
    const data = createPageSchema.parse(body);

    const existing = await prisma.cmsPage.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      throw badRequest("A page with this slug already exists");
    }

    const page = await prisma.cmsPage.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        status: data.status ?? "DRAFT",
        orderIndex: data.orderIndex ?? 0,
      },
    });

    return NextResponse.json(
      { success: true, data: page },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
