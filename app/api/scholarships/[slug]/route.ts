import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/auth";
import { handleApiError, notFound } from "@/utils/api-error";

const updateScholarshipSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  eligibility: z.string().optional().nullable(),
  benefits: z.string().optional().nullable(),
  coverImageUrl: z.string().url().optional().nullable(),
  applicationDeadline: z.string().optional().nullable(),
  totalAmount: z.number().positive().optional().nullable(),
  totalSlots: z.number().int().positive().optional().nullable(),
  isActive: z.boolean().optional(),
});

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const scholarship = await prisma.scholarship.findUnique({
      where: { slug },
      include: { students: { orderBy: { createdAt: "desc" } } },
    });
    if (!scholarship) throw notFound("Scholarship");
    return NextResponse.json({ success: true, data: scholarship });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireRole("SUPER_ADMIN", "CONTENT_MANAGER");
    const { slug } = await params;
    const body = await request.json();
    const data = updateScholarshipSchema.parse(body);

    const existing = await prisma.scholarship.findUnique({ where: { slug } });
    if (!existing) throw notFound("Scholarship");

    const scholarship = await prisma.scholarship.update({
      where: { slug },
      data: {
        ...data,
        applicationDeadline: data.applicationDeadline !== undefined ? (data.applicationDeadline ? new Date(data.applicationDeadline) : null) : undefined,
      },
    });

    return NextResponse.json({ success: true, data: scholarship });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireRole("SUPER_ADMIN");
    const { slug } = await params;
    const existing = await prisma.scholarship.findUnique({ where: { slug } });
    if (!existing) throw notFound("Scholarship");

    await prisma.scholarship.delete({ where: { slug } });
    return NextResponse.json({ success: true, message: "Scholarship deleted" });
  } catch (error) {
    return handleApiError(error);
  }
}
