import { z } from "zod";

export const signupFormSchema = z
  .object({
    username: z
      .string({
        required_error: "Please enter your username",
      })
      .min(3, "Username must be at least 3 characters"),

    first_name: z
      .string({
        required_error: "Please enter your first name",
      })
      .min(1, "First name is required"),

    last_name: z
      .string({
        required_error: "Please enter your last name",
      })
      .min(1, "Last name is required"),

    email: z
      .string({
        required_error: "Please enter your email address",
      })
      .email("Please enter a valid email address"),

    password_1: z
      .string({
        required_error: "Please enter your password",
      })
      .min(6, "Password must be at least 6 characters"),

    password_2: z
      .string({
        required_error: "Please confirm your password",
      }),
  })
  .refine((data) => data.password_1 === data.password_2, {
    message: "Passwords don't match",
    path: ["password_2"],
  });
