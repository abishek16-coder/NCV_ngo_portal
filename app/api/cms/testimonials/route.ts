import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/auth";
import { handleApiError, badRequest } from "@/utils/api-error";
import { TestimonialStatus } from "@prisma/client";

const createTestimonialSchema = z.object({
  authorName: z.string().min(1, "Author name is required"),
  authorRole: z.string().optional(),
  authorPhotoUrl: z.string().optional(),
  content: z.string().min(10, "Content must be at least 10 characters"),
  rating: z.number().int().min(1).max(5).optional(),
  orderIndex: z.number().int().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");

    let where: Record<string, unknown> = {};

    if (statusParam === "APPROVED") {
      where = { status: "APPROVED" as TestimonialStatus };
    } else if (statusParam) {
      if (!Object.values(TestimonialStatus).includes(statusParam as TestimonialStatus)) {
        throw badRequest("Invalid status value");
      }
      where = { status: statusParam as TestimonialStatus };
    } else {
      try {
        await requireAuth();
      } catch {
        where = { status: "APPROVED" as TestimonialStatus };
      }
    }

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: [
        { orderIndex: "asc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireRole("SUPER_ADMIN", "CONTENT_MANAGER");

    const body = await request.json();
    const data = createTestimonialSchema.parse(body);

    const testimonial = await prisma.testimonial.create({
      data: {
        authorName: data.authorName,
        authorRole: data.authorRole,
        authorPhotoUrl: data.authorPhotoUrl,
        content: data.content,
        rating: data.rating,
        orderIndex: data.orderIndex ?? 0,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      { success: true, data: testimonial },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
