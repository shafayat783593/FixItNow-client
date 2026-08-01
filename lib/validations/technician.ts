import { z } from "zod";

export const technicianProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().optional(),
  experience: z.coerce
    .number({ invalid_type_error: "Experience must be a number" })
    .min(0, "Experience cannot be negative")
    .optional(),
  skills: z.string().optional(), // Entered as comma-separated values (e.g. "Wiring, AC Repair")
  address: z.string().optional(),
  phone: z.string().min(10, "Phone number must be at least 10 digits").optional().or(z.literal("")),
  avatar: z.string().url("Please enter a valid image URL").optional().or(z.literal("")),
});

export type ITechnicianProfileInput = z.infer<typeof technicianProfileSchema>;


import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z.string().max(1000).optional().or(z.literal("")),
  categoryId: z.string().min(1, "Please select a category"),
  price: z.coerce.number({ invalid_type_error: "Price must be a number" }).positive("Price must be greater than 0"),
  duration: z.coerce.number({ invalid_type_error: "Duration must be a number" }).int().positive("Duration must be greater than 0"),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;