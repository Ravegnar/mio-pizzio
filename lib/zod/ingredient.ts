import { z } from "zod";

export const ingredientSchema = z.object({
   description: z.string().optional(),
   isActive: z.boolean().default(false),
   isGlutenFree: z.boolean().default(false),
   isVegan: z.boolean().default(false),
   name: z.string().min(1, "Name is required"),
   price: z.coerce.number().min(0, "Price must be greater than 0"),
});
