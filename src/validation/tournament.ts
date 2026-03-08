import z from "zod";

export const tournamentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sport: z.string().min(1, "Sport is required"),
  type: z.enum([
    "league",
    "tournament",
    "cup",
    "international",
    "grand_slam",
    "other",
  ]),
  description: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  year: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  isFeatured: z.boolean(),
  logo: z.any().optional(),
});

export type TournamentFormValues = z.infer<typeof tournamentSchema>;
