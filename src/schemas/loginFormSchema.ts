import { z } from "zod";

export const loginFormSchema = z.object({
	account: z.string({
		required_error: "Please enter your username or email address",
	}).min(3, "Username or email address must be at least 3 characters"),
	password: z.string({
		required_error: "Please enter your password",
	}).min(6, "Password must be at least 6 characters"),
});