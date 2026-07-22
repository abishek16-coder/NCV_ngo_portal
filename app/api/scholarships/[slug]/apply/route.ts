import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { handleApiError, badRequest, notFound } from "@/utils/api-error";

const applySchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  institute: z.string().optional(),
  course: z.string().optional(),
  yearOfStudy: z.number().int().positive().optional(),
  familyIncome: z.number().min(0).optional(),
  documentsUrl: z.string().optional(),
});

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const scholarship = await prisma.scholarship.findUnique({ where: { slug } });
    if (!scholarship) throw notFound("Scholarship");
    if (!scholarship.isActive) throw badRequest("This scholarship is not currently accepting applications");

    const body = await request.json();
    const data = applySchema.parse(body);

    const existing = await prisma.student.findFirst({
      where: { scholarshipId: scholarship.id, email: data.email, status: { not: "REJECTED" } },
    });
    if (existing) throw badRequest("You have already applied for this scholarship");

    const student = await prisma.student.create({
      data: {
        scholarshipId: scholarship.id,
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
      },
    });

    return NextResponse.json({ success: true, data: student }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
