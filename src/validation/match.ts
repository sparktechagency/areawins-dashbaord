import z from "zod";

export const matchSchema = z
  .object({
    sport: z.string().min(1, "Sport is required"),
    tournament: z.string().optional(),
    homeTeam: z.string().min(1, "Home Team is required"),
    awayTeam: z.string().min(1, "Away Team is required"),
    scheduledStartTime: z.string().min(1, "Start Time is required"),
    status: z.enum(["scheduled", "live", "finished", "cancelled", "postponed"]),
    isFeatured: z.boolean(),
    homeScore: z.coerce.number(),
    awayScore: z.coerce.number(),
  })
  .refine((data) => data.homeTeam !== data.awayTeam, {
    message: "Home and Away teams cannot be the same",
    path: ["awayTeam"],
  });

export type MatchFormValues = z.infer<typeof matchSchema>;
