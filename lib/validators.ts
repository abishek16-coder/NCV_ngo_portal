import { z } from "zod";

export const fileSchema = z.object({
  size: z.number().max(5 * 1024 * 1024, "File must be less than 5MB"),
  type: z.enum(
    ["image/jpeg", "image/jpg", "image/png", "application/pdf"],
    { message: "Only JPEG, PNG, and PDF files are allowed" }
  ),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const idParamSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
});

export const emailSchema = z.string().email("Invalid email address");

export const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s-]{10,15}$/, "Invalid phone number")
  .optional();

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  );
