import { z } from "zod";

import { messageSchema } from "./message.schema.js";
import { imageSchema } from "./common.schema.js";

export const descriptionSchema = z.object({
  content: z
    .string()
    .trim()
    .min(10, { message: "Content must be at least of 10 characters" }),
});

export const blogSchema = z.object({
  title: messageSchema.shape.content,
  content: descriptionSchema.shape.content,
  coverImage: imageSchema,
});
