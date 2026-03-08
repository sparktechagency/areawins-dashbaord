import z from "zod";

export const outcomeSchema = z.object({
  outcomeId: z.string().min(1, "ID is required"),
  label: z.string().min(1, "Label is required"),
  displayOrder: z.coerce.number(),
});

export const betTypeSchema = z.object({
  betTypeId: z.string().min(1, "Bet Type ID is required"),
  sport: z.string().min(1, "Sport is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  outcomes: z.array(outcomeSchema).min(1, "At least one outcome is required"),
  isDefault: z.boolean(),
  displayOrder: z.coerce.number(),
  isActive: z.boolean(),
});

export type BetTypeFormValues = z.infer<typeof betTypeSchema>;
