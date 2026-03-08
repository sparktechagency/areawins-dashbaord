import z from "zod";

export const sportCategoriesSchema = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z.any().refine((file) => file, "Image is required"),
});

export type SportCategoriesFormValues = z.infer<typeof sportCategoriesSchema>;
