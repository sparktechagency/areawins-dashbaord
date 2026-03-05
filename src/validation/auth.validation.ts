import z from "zod";

export const loginValidationSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const verifyOtpValidationSchema = z.object({
  sessionId: z.string().min(1, "Session ID is required"),
  code: z.string().min(6, "OTP must be at least 6 characters"),
});

export const forgotPasswordValidationSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordValidationSchema = z.object({
  resetPasswordToken: z.string().min(1, "Reset Password Token is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password must be at least 6 characters"),
});

export const resendOtpValidationSchema = z.object({
  sessionId: z.string().min(1, "Session ID is required"),
});

export const changePasswordValidationSchema = z.object({
  oldPassword: z.string().min(6, "Old Password must be at least 6 characters"),
  newPassword: z.string().min(6, "New Password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginValidationSchema>;
export type VerifyOtpFormValues = z.infer<typeof verifyOtpValidationSchema>;
export type ForgotPasswordFormValues = z.infer<
  typeof forgotPasswordValidationSchema
>;
export type ResetPasswordFormValues = z.infer<
  typeof resetPasswordValidationSchema
>;
export type ResendOtpFormValues = z.infer<typeof resendOtpValidationSchema>;
export type ChangePasswordFormValues = z.infer<
  typeof changePasswordValidationSchema
>;
