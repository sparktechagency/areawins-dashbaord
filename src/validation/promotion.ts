import z from "zod";

export const promotionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["New User", "Retention", "Special", "Seasonal"]),
  status: z.enum(["Active", "Scheduled", "Paused", "Expired"]),
  reach: z.string().min(1, "Reach description is required"),
  color: z.enum([
    "bg-green-500",
    "bg-blue-500",
    "bg-orange-500",
    "bg-purple-500",
    "bg-red-500",
  ]),
  description: z.string().min(1, "Description is required"),
});

export type PromotionFormValues = z.infer<typeof promotionSchema>;
