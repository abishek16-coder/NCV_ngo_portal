import Razorpay from "razorpay";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export type CreateOrderParams = {
  amount: number;
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
};

export async function createOrder(params: CreateOrderParams) {
  const order = await razorpay.orders.create({
    amount: Math.round(params.amount * 100),
    currency: params.currency || "INR",
    receipt: params.receipt,
    notes: params.notes,
  });

  return order;
}

export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  return validatePaymentVerification(
    { order_id: orderId, payment_id: paymentId },
    signature,
    process.env.RAZORPAY_KEY_SECRET || ""
  );
}

export async function getPaymentById(paymentId: string) {
  return razorpay.payments.fetch(paymentId);
}

export async function capturePayment(paymentId: string, amount: number) {
  return razorpay.payments.capture(paymentId, Math.round(amount * 100), "INR");
}

export async function refundPayment(paymentId: string, amount?: number) {
  return razorpay.payments.refund(paymentId, {
    amount: amount ? Math.round(amount * 100) : undefined,
  });
}

export default razorpay;
