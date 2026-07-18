import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/auth";
import { handleApiError, notFound } from "@/utils/api-error";

type RouteContext = { params: Promise<{ slug: string; versionId: string }> };

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    await requireAuth();
    const { slug, versionId } = await params;

    const page = await prisma.cmsPage.findUnique({
      where: { slug },
    });

    if (!page) {
      throw notFound("Page");
    }

    const version = await prisma.cmsContentVersion.findFirst({
      where: {
        id: versionId,
        pageId: page.id,
      },
    });

    if (!version) {
      throw notFound("Version");
    }

    return NextResponse.json({
      success: true,
      data: version,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(_request: NextRequest, { params }: RouteContext) {
  try {
    const user = await requireRole("SUPER_ADMIN", "CONTENT_MANAGER");
    const { slug, versionId } = await params;

    const page = await prisma.cmsPage.findUnique({
      where: { slug },
    });

    if (!page) {
      throw notFound("Page");
    }

    const version = await prisma.cmsContentVersion.findFirst({
      where: {
        id: versionId,
        pageId: page.id,
      },
    });

    if (!version) {
      throw notFound("Version");
    }

    const lastVersion = await prisma.cmsContentVersion.findFirst({
      where: { pageId: page.id },
      orderBy: { version: "desc" },
    });

    const nextVersion = (lastVersion?.version ?? 0) + 1;

    const [updatedPage] = await prisma.$transaction([
      prisma.cmsPage.update({
        where: { id: page.id },
        data: { content: version.content },
      }),
      prisma.cmsContentVersion.create({
        data: {
          pageId: page.id,
          content: version.content,
          version: nextVersion,
          createdBy: user.id,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: updatedPage,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
