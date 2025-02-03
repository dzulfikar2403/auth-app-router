import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, { message: "min 3 character" }).trim(),
  email: z.string().email({ message: "please enter a valid email" }).trim(),
  password: z
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, { message: "Minimum eight characters, at least one letter, one number and one special character" })
    .trim(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "please enter a valid email" }).trim(),
  password: z.string().min(1, { message: "Password must not be empty" }).trim(),
});
