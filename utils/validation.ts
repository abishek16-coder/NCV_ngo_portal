import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const volunteerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  occupation: z.string().optional(),
  skills: z.string().optional(),
  availability: z.string().optional(),
  reason: z.string().optional(),
});

export const donationSchema = z.object({
  donorName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  amount: z.number().positive("Amount must be positive"),
  message: z.string().optional(),
  isAnonymous: z.boolean().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type VolunteerFormData = z.infer<typeof volunteerSchema>;
export type DonationFormData = z.infer<typeof donationSchema>;
