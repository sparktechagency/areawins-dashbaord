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
  startDate: z.string().optional().or(z.date().optional()),
  endDate: z.string().optional().or(z.date().optional()),
  year: z.string().optional(),
  country: z.string().optional(),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
  logo: z.any().refine((file) => file, "Logo is required"),
});

export type TournamentFormValues = z.infer<typeof tournamentSchema>;
