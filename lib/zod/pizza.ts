import { z } from "zod";

export const pizzaSchema = z.object({
   description: z.string().optional(),
   name: z.string().min(1, "Name is required"),
   price: z.coerce.number().min(0, "Price must be greater than 0"),
   size: z.coerce.number().min(0, "Price must be greater than 0"),
   isActive: z.boolean().optional().default(false),
   isGlutenFree: z.boolean().optional().default(false),
   isVegan: z.boolean().optional().default(false),
   ingredients: z.array(z.coerce.number().min(1, "Ingredient ID must be a positive number")),
});
