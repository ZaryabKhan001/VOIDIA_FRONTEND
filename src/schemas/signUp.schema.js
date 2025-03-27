import {
  nameValidation,
  emailValidation,
  passwordValidation,
} from "./common.schema.js";
import { z } from "zod";

export const signUpSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
});
