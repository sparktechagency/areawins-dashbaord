import z from "zod";

export const teamSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  sport: z.string().min(1, "Sport is required"),
  shortName: z.string().min(1, "Short Name is required"),
  country: z.string().min(1, "Country is required"),
  logo: z.any().optional(),
  isActive: z.boolean(),
});

export type TeamFormValues = z.infer<typeof teamSchema>;
