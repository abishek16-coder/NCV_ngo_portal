import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { handleApiError, notFound } from "@/utils/api-error";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    await requireAuth();
    const { slug } = await params;

    const page = await prisma.cmsPage.findUnique({
      where: { slug },
    });

    if (!page) {
      throw notFound("Page");
    }

    const versions = await prisma.cmsContentVersion.findMany({
      where: { pageId: page.id },
      orderBy: { version: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: versions,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
