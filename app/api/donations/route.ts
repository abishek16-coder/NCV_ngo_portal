import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { donationSchema } from "@/utils/validation";
import { handleApiError } from "@/utils/api-error";
import { DonationStatus, PaymentMethod } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    await requireAuth();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as DonationStatus | null;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: Record<string, unknown> = {};
    if (status && Object.values(DonationStatus).includes(status)) where.status = status;

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.donation.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: donations,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = donationSchema.parse(body);

    const paymentMethod = (body.paymentMethod as PaymentMethod) || "RAZORPAY";

    const donation = await prisma.donation.create({
      data: {
        ...data,
        paymentMethod,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, data: donation }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
