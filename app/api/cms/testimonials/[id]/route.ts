import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { handleApiError, notFound, badRequest } from "@/utils/api-error";
import { TestimonialStatus } from "@prisma/client";

const updateStatusSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    await requireRole("SUPER_ADMIN", "CONTENT_MANAGER");
    const { id } = await params;

    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonial) {
      throw notFound("Testimonial");
    }

    const body = await request.json();
    const data = updateStatusSchema.parse(body);

    const updated = await prisma.testimonial.update({
      where: { id },
      data: { status: data.status as TestimonialStatus },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    await requireRole("SUPER_ADMIN", "CONTENT_MANAGER");
    const { id } = await params;

    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonial) {
      throw notFound("Testimonial");
    }

    await prisma.testimonial.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      data: { message: "Testimonial deleted" },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
