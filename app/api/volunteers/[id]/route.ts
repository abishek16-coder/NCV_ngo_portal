import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { handleApiError, notFound } from "@/utils/api-error";
import { VolunteerStatus } from "@prisma/client";

const updateVolunteerSchema = z.object({
  status: z.nativeEnum(VolunteerStatus).optional(),
});

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await params;
    const body = await request.json();
    const data = updateVolunteerSchema.parse(body);

    const volunteer = await prisma.volunteer.findUnique({ where: { id } });
    if (!volunteer) throw notFound("Volunteer");

    const updated = await prisma.volunteer.update({ where: { id }, data });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await params;
    const volunteer = await prisma.volunteer.findUnique({ where: { id } });
    if (!volunteer) throw notFound("Volunteer");

    await prisma.volunteer.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Volunteer removed" });
  } catch (error) {
    return handleApiError(error);
  }
}
