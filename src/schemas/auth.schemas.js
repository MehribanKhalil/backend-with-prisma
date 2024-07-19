import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .refine(
      (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value ?? ""),
      "Name should contain only alphabets"
    ),
  email: z.string().min(1, "Email is required").email('Invalid email address'),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export { registerSchema, loginSchema };
