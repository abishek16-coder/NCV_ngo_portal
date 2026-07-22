import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/auth";
import { handleApiError, notFound } from "@/utils/api-error";
import { ProjectStatus } from "@prisma/client";

const updateProjectSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  description: z.string().min(1).optional(),
  content: z.string().optional(),
  shortDescription: z.string().optional(),
  coverImageUrl: z.string().optional().nullable(),
  status: z.nativeEnum(ProjectStatus).optional(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  targetAmount: z.number().positive().optional().nullable(),
  raisedAmount: z.number().min(0).optional(),
  location: z.string().optional().nullable(),
  isFeatured: z.boolean().optional(),
  orderIndex: z.number().int().optional(),
});

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const project = await prisma.project.findUnique({
      where: { slug },
      include: { images: { orderBy: { orderIndex: "asc" } } },
    });
    if (!project) throw notFound("Project");
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireRole("SUPER_ADMIN", "CONTENT_MANAGER");
    const { slug } = await params;
    const body = await request.json();
    const data = updateProjectSchema.parse(body);

    const existing = await prisma.project.findUnique({ where: { slug } });
    if (!existing) throw notFound("Project");

    const project = await prisma.project.update({
      where: { slug },
      data: {
        ...data,
        startDate: data.startDate !== undefined ? (data.startDate ? new Date(data.startDate) : null) : undefined,
        endDate: data.endDate !== undefined ? (data.endDate ? new Date(data.endDate) : null) : undefined,
      },
    });

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireRole("SUPER_ADMIN");
    const { slug } = await params;
    const existing = await prisma.project.findUnique({ where: { slug } });
    if (!existing) throw notFound("Project");

    await prisma.project.delete({ where: { slug } });
    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (error) {
    return handleApiError(error);
  }
}
