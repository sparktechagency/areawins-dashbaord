import z from "zod";

export const sportCategoriesSchema = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z.any().optional(),
});

export type SportCategoriesFormValues = z.infer<typeof sportCategoriesSchema>;
