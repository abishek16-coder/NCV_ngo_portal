import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/auth";
import { handleApiError, badRequest } from "@/utils/api-error";
import { EventStatus } from "@prisma/client";

const createEventSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(1),
  shortDescription: z.string().optional(),
  coverImageUrl: z.string().url().optional(),
  eventDate: z.string(),
  endDate: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  venue: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  maxAttendees: z.number().int().positive().optional(),
  status: z.nativeEnum(EventStatus).optional(),
  registrationDeadline: z.string().optional(),
  isFeatured: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as EventStatus | null;
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    let where: Record<string, unknown> = {};

    if (status && Object.values(EventStatus).includes(status)) {
      where.status = status;
    }
    if (featured === "true") {
      where.isFeatured = true;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
      ];
    }

    try {
      await requireAuth();
    } catch {
      where.status = "UPCOMING" as EventStatus;
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy: { eventDate: "asc" },
        skip: (page - 1) * limit,
        take: limit,
        include: { _count: { select: { registrations: true } } },
      }),
      prisma.event.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: events,
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
    const data = createEventSchema.parse(body);

    const existing = await prisma.event.findUnique({ where: { slug: data.slug } });
    if (existing) throw badRequest("An event with this slug already exists");

    const event = await prisma.event.create({
      data: {
        ...data,
        eventDate: new Date(data.eventDate),
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        registrationDeadline: data.registrationDeadline ? new Date(data.registrationDeadline) : undefined,
      },
    });

    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
