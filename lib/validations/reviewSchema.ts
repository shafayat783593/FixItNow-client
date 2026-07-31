import { z } from "zod";

export const reviewSchema = z.object({
  rating: z
    .number({ invalid_type_error: "Please select a rating" })
    .min(1, "Please select a rating")
    .max(5),
  comment: z
    .string()
    .max(500, "Comment must be under 500 characters")
    .optional()
    .or(z.literal("")),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;    