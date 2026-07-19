import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { handleApiError, badRequest, notFound } from "@/utils/api-error";

const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  city: z.string().optional(),
  organization: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const event = await prisma.event.findUnique({ where: { slug } });
    if (!event) throw notFound("Event");
    if (event.status !== "UPCOMING") throw badRequest("Registration is not open for this event");

    const body = await request.json();
    const data = registerSchema.parse(body);

    const existing = await prisma.eventRegistration.findFirst({
      where: { eventId: event.id, email: data.email, status: { not: "CANCELLED" } },
    });
    if (existing) throw badRequest("You are already registered for this event");

    if (event.maxAttendees) {
      const count = await prisma.eventRegistration.count({
        where: { eventId: event.id, status: { in: ["PENDING", "CONFIRMED"] } },
      });
      if (count >= event.maxAttendees) throw badRequest("This event is fully booked");
    }

    const registration = await prisma.eventRegistration.create({
      data: { eventId: event.id, ...data },
    });

    return NextResponse.json({ success: true, data: registration }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
