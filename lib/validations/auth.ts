import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9!@#$%^&*]/, "Password must include a number or symbol"),
  role: z.enum(["CUSTOMER", "TECHNICIAN"], { required_error: "Please select a role" }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;



export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Enter a valid Bangladeshi phone number")
    .optional()
    .or(z.literal("")),
  avatar: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  bio:z.string().min(3,"Bio must be at least 3 characters").max(500).optional().or(z.literal("")),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;