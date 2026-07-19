import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { volunteerSchema } from "@/utils/validation";
import { handleApiError, badRequest } from "@/utils/api-error";
import { VolunteerStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    await requireAuth();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as VolunteerStatus | null;
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: Record<string, unknown> = {};
    if (status && Object.values(VolunteerStatus).includes(status)) where.status = status;
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
      ];
    }

    const [volunteers, total] = await Promise.all([
      prisma.volunteer.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.volunteer.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: volunteers,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = volunteerSchema.parse(body);

    const existing = await prisma.volunteer.findUnique({ where: { email: data.email } });
    if (existing) throw badRequest("A volunteer with this email already exists");

    const volunteer = await prisma.volunteer.create({
      data: {
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
      },
    });

    return NextResponse.json({ success: true, data: volunteer }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
