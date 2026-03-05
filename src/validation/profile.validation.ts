import z from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["Super Admin", "Moderator", "Editor"]),
  profileImage: z.any().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
