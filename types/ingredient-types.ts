import { ingredientSchema } from "@zod/ingredient";
import { z } from "zod";

export type IngredientType = z.infer<typeof ingredientSchema>;
