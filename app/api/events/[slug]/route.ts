import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/auth";
import { handleApiError, notFound } from "@/utils/api-error";
import { EventStatus } from "@prisma/client";

const updateEventSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  description: z.string().min(1).optional(),
  shortDescription: z.string().optional().nullable(),
  coverImageUrl: z.string().url().optional().nullable(),
  eventDate: z.string().optional(),
  endDate: z.string().optional().nullable(),
  startTime: z.string().optional().nullable(),
  endTime: z.string().optional().nullable(),
  venue: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  maxAttendees: z.number().int().positive().optional().nullable(),
  status: z.nativeEnum(EventStatus).optional(),
  registrationDeadline: z.string().optional().nullable(),
  isFeatured: z.boolean().optional(),
});

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const event = await prisma.event.findUnique({
      where: { slug },
      include: { _count: { select: { registrations: true } } },
    });
    if (!event) throw notFound("Event");
    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireRole("SUPER_ADMIN", "CONTENT_MANAGER");
    const { slug } = await params;
    const body = await request.json();
    const data = updateEventSchema.parse(body);

    const existing = await prisma.event.findUnique({ where: { slug } });
    if (!existing) throw notFound("Event");

    const event = await prisma.event.update({
      where: { slug },
      data: {
        ...data,
        eventDate: data.eventDate ? new Date(data.eventDate) : undefined,
        endDate: data.endDate !== undefined ? (data.endDate ? new Date(data.endDate) : null) : undefined,
        registrationDeadline: data.registrationDeadline !== undefined ? (data.registrationDeadline ? new Date(data.registrationDeadline) : null) : undefined,
      },
    });

    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireRole("SUPER_ADMIN");
    const { slug } = await params;
    const existing = await prisma.event.findUnique({ where: { slug } });
    if (!existing) throw notFound("Event");

    await prisma.event.delete({ where: { slug } });
    return NextResponse.json({ success: true, message: "Event deleted" });
  } catch (error) {
    return handleApiError(error);
  }
}
