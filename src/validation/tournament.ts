import z from "zod";

export const tournamentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  sport: z.string().min(1, "Sport is required"),
  type: z.enum(["league", "tournament", "cup", "international", "grand_slam"]),
  year: z.string().optional(),
  country: z.string().optional(),
  logo: z.any().optional(),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
});

export type TournamentFormValues = z.infer<typeof tournamentSchema>;
