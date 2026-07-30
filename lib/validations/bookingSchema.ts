import { z } from "zod";



export const bookingSchema = z.object({
  date: z
    .string()
    .min(1, "Please select a date")
    .refine((val) => new Date(val) >= new Date(new Date().toDateString()), {
      message: "Date can't be in the past",
    }),
  time: z.string().min(1, "Please select a time"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address is too long"),
  note: z.string().max(300, "Note must be under 300 characters").optional(),
});

 export type BookingFormValues = z.infer<typeof bookingSchema>;