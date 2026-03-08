import z from "zod";

export const teamSchema = z.object({
  name: z.string().min(1, "Name is required"),
  shortName: z.string().min(1, "Short name is required"),
  sport: z.string().min(1, "Sport is required"),
  tournament: z.string().min(1, "Tournament is required"),
  country: z.string().min(1, "Country is required"),
  foundedYear: z.string().min(1, "Founded year is required"),
  logo: z.any().optional(),
});

export type TeamFormValues = z.infer<typeof teamSchema>;
