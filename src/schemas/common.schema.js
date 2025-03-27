import { z } from "zod";

export const nameValidation = z
  .string()
  .trim()
  .min(2, "UserName must be atleast 2 characters")
  .max(20, "UserName must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "UserName must not contain special character");

export const emailValidation = z
  .string()
  .trim()
  .email({ message: "Invalid Email" });

export const passwordValidation = z
  .string()
  .min(6, { message: "Password must be at least 6 characters" });

export const imageSchema = z
  .union([
    z
      .instanceof(FileList)
      .refine((fileList) => fileList.length > 0, {
        message: "Image is required",
      })
      .refine((fileList) => fileList.item(0) instanceof File, {
        message: "Invalid file format",
      })
      .refine((fileList) => fileList.item(0)?.size < 5 * 1024 * 1024, {
        message: "File size must be less than 5MB",
      })
      .refine(
        (fileList) =>
          ["image/jpeg", "image/png", "image/jpg"].includes(
            fileList.item(0)?.type
          ),
        {
          message: "Only JPG and PNG files are allowed",
        }
      ),
    z
      .string()
      .min(1, "Image URL is required") // Prevents empty strings
      .url("Invalid image URL"), // Ensures it's a valid URL
  ])
  .optional();
