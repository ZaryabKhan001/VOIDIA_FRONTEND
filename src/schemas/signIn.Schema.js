import { emailValidation, passwordValidation } from "./common.schema.js";
import { z } from "zod";

export const signInSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});
