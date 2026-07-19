import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { handleApiError, notFound } from "@/utils/api-error";
import { DonationStatus } from "@prisma/client";

const updateDonationSchema = z.object({
  status: z.nativeEnum(DonationStatus).optional(),
  paymentId: z.string().optional(),
  orderId: z.string().optional(),
});

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await params;
    const body = await request.json();
    const data = updateDonationSchema.parse(body);

    const donation = await prisma.donation.findUnique({ where: { id } });
    if (!donation) throw notFound("Donation");

    const updated = await prisma.donation.update({ where: { id }, data });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return handleApiError(error);
  }
}
