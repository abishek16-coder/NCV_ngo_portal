import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { handleApiError, badRequest } from "@/utils/api-error";
import { ProjectStatus } from "@prisma/client";

const createProjectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(1),
  content: z.string().optional(),
  shortDescription: z.string().optional(),
  coverImageUrl: z.string().optional(),
  status: z.nativeEnum(ProjectStatus).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  targetAmount: z.number().positive().optional(),
  location: z.string().optional(),
  isFeatured: z.boolean().optional(),
  orderIndex: z.number().int().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as ProjectStatus | null;
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    const where: Record<string, unknown> = {};

    if (status && Object.values(ProjectStatus).includes(status)) {
      where.status = status;
    }
    if (featured === "true") {
      where.isFeatured = true;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy: [{ orderIndex: "asc" }, { createdAt: "desc" }],
        skip: (page - 1) * limit,
        take: limit,
        include: { _count: { select: { images: true } } },
      }),
      prisma.project.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: projects,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createProjectSchema.parse(body);

    const existing = await prisma.project.findUnique({ where: { slug: data.slug } });
    if (existing) throw badRequest("A project with this slug already exists");

    const project = await prisma.project.create({
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
