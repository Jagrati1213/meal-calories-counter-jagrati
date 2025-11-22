import { z } from "zod";

// Login schema for  validation
export const loginSchema = z.object({
  email: z
    .email("Please enter valid email")
    .trim()
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase(),

  password: z.string().min(8, "Password must be at least 8 characters long"),
});

// Register schema for validation
export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name should have at least 2 characters.")
    .max(255, "First name must not exceed 255 characters"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name should have at least 2 characters.")
    .max(255, "Last name must not exceed 255 characters"),

  email: z
    .email("Please enter valid email")
    .trim()
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-z])(?=.*\d)/,
      "Password must content at least one uppercase letter, one lowercase letter, and one number"
    ),
});

// Check for confirm password
export const registerUserWithConfirmSchema = registerSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

// used to create type from zod schema
export type RegisterUserData = z.infer<typeof registerSchema>;
export type RegisterUserWithConfirmData = z.infer<
  typeof registerUserWithConfirmSchema
>;
export type LoginUserData = z.infer<typeof loginSchema>;
