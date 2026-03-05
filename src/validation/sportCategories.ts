import z from "zod";

export const sportCategoriesSchema = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z.string().min(1, "Icon is required").optional(),
});

export type SportCategoriesFormValues = z.infer<typeof sportCategoriesSchema>;
