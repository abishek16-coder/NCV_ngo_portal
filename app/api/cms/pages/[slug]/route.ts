import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { handleApiError, notFound, badRequest } from "@/utils/api-error";
import { CmsPageStatus } from "@prisma/client";

const updatePageSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  content: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  status: z.nativeEnum(CmsPageStatus).optional(),
  orderIndex: z.number().int().optional(),
});

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = await params;

    const page = await prisma.cmsPage.findUnique({
      where: { slug },
    });

    if (!page) {
      throw notFound("Page");
    }

    return NextResponse.json({
      success: true,
      data: page,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const user = await requireRole("SUPER_ADMIN", "CONTENT_MANAGER");
    const { slug } = await params;

    const page = await prisma.cmsPage.findUnique({
      where: { slug },
    });

    if (!page) {
      throw notFound("Page");
    }

    const body = await request.json();
    const data = updatePageSchema.parse(body);

    if (data.slug && data.slug !== slug) {
      const existing = await prisma.cmsPage.findUnique({
        where: { slug: data.slug },
      });
      if (existing) {
        throw badRequest("A page with this slug already exists");
      }
    }

    if (data.content !== undefined && data.content !== page.content) {
      const lastVersion = await prisma.cmsContentVersion.findFirst({
        where: { pageId: page.id },
        orderBy: { version: "desc" },
      });

      await prisma.cmsContentVersion.create({
        data: {
          pageId: page.id,
          content: page.content,
          version: (lastVersion?.version ?? 0) + 1,
          createdBy: user.id,
        },
      });
    }

    const updated = await prisma.cmsPage.update({
      where: { id: page.id },
      data,
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    await requireRole("SUPER_ADMIN");
    const { slug } = await params;

    const page = await prisma.cmsPage.findUnique({
      where: { slug },
    });

    if (!page) {
      throw notFound("Page");
    }

    await prisma.cmsPage.delete({
      where: { id: page.id },
    });

    return NextResponse.json({
      success: true,
      data: { message: "Page deleted successfully" },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
