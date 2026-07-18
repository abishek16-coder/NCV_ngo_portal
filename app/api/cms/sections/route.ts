import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { handleApiError, badRequest } from "@/utils/api-error";

const SECTION_PREFIX = "cms_section_";

const sectionsUpdateSchema = z.object({
  sections: z.array(
    z.object({
      key: z.string().min(1, "Key is required"),
      value: z.string(),
    })
  ).min(1, "At least one section is required"),
});

export async function GET() {
  try {
    const settings = await prisma.settings.findMany({
      where: {
        key: { startsWith: SECTION_PREFIX },
      },
      orderBy: { key: "asc" },
    });

    const sections: Record<string, string> = {};
    for (const setting of settings) {
      const sectionKey = setting.key.replace(SECTION_PREFIX, "");
      sections[sectionKey] = setting.value;
    }

    return NextResponse.json({
      success: true,
      data: sections,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireRole("SUPER_ADMIN", "CONTENT_MANAGER");

    const body = await request.json();
    const data = sectionsUpdateSchema.parse(body);

    const operations = data.sections.map((section) =>
      prisma.settings.upsert({
        where: { key: `${SECTION_PREFIX}${section.key}` },
        create: {
          key: `${SECTION_PREFIX}${section.key}`,
          value: section.value,
        },
        update: {
          value: section.value,
        },
      })
    );

    await prisma.$transaction(operations);

    const settings = await prisma.settings.findMany({
      where: {
        key: { startsWith: SECTION_PREFIX },
      },
    });

    const sections: Record<string, string> = {};
    for (const setting of settings) {
      const sectionKey = setting.key.replace(SECTION_PREFIX, "");
      sections[sectionKey] = setting.value;
    }

    return NextResponse.json({
      success: true,
      data: sections,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
