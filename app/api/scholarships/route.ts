import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/auth";
import { handleApiError, badRequest } from "@/utils/api-error";

const createScholarshipSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(1),
  eligibility: z.string().optional(),
  benefits: z.string().optional(),
  coverImageUrl: z.string().optional(),
  applicationDeadline: z.string().optional(),
  totalAmount: z.number().positive().optional(),
  totalSlots: z.number().int().positive().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const active = searchParams.get("active");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    const where: Record<string, unknown> = {};
    if (active !== null) where.isActive = active === "true";

    const [scholarships, total] = await Promise.all([
      prisma.scholarship.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: { _count: { select: { students: true } } },
      }),
      prisma.scholarship.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: scholarships,
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
    const data = createScholarshipSchema.parse(body);

    const existing = await prisma.scholarship.findUnique({ where: { slug: data.slug } });
    if (existing) throw badRequest("A scholarship with this slug already exists");

    const scholarship = await prisma.scholarship.create({
      data: {
        ...data,
        applicationDeadline: data.applicationDeadline ? new Date(data.applicationDeadline) : undefined,
      },
    });

    return NextResponse.json({ success: true, data: scholarship }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
