import { z } from "zod";

export const completeProfileSchema = z.object({
  first_name: z
    .string({
      required_error: "First name is required",
    })
    .min(2, "First name must be at least 2 characters"),
  last_name: z
    .string({
      required_error: "Last name is required",
    })
    .min(2, "Last name must be at least 2 characters"),
  email: z.string({
      required_error: "Please enter your email address",
  }).email("Please enter a valid email address"),
  country: z
    .string({
      required_error: "Country is required",
    })
    .nonempty("Country must be selected"),
  currency: z
    .string({
      required_error: "Currency is required",
    })
    .nonempty("Currency must be selected"),
  account_image: z
    .custom<File>((file) => {
      if (!file) return false;
      const isValidType = ["image/png", "image/jpeg", "image/jpg"].includes(file.type);
      const isValidSize = file.size <= 2 * 1024 * 1024; // 2MB max size
      return isValidType && isValidSize;
    }, "Invalid image file. Only PNG, JPG, and JPEG files under 2MB are allowed.")
    .optional(),
});
