import { z } from "zod";
 
export const blogPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(150),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(300),
  content: z.string().min(50, "Content must be at least 50 characters"),
  coverImage: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  published: z.boolean().default(true),
});
 
export type BlogPostFormValues = z.infer<typeof blogPostSchema>;
 