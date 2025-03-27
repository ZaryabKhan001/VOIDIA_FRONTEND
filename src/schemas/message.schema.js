import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .trim()
    .min(3, { message: "Content must be at least of 3 characters" })
    .max(300, { message: "Content must be no longer than 300 characters" }),
});
