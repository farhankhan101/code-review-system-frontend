import { z } from "zod";

export const signupFormSchema = z.object({
    username: z.string({
        required_error: "Please enter your username",
    }).min(3, "Username must be at least 3 characters"),
    email: z.string({
        required_error: "Please enter your email address",
    }).email("Please enter a valid email address"),
    password: z.string({
        required_error: "Please enter your password",
    }).min(6, "Password must be at least 6 characters"),
    password_confirmation: z.string({
        required_error: "Please re-enter your password",
    })
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
});