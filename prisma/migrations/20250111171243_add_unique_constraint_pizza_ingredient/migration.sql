/*
  Warnings:

  - A unique constraint covering the columns `[pizzaId,ingredientId]` on the table `PizzaIngredient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Color" AS ENUM ('Red', 'Green', 'Blue');

-- CreateIndex
CREATE UNIQUE INDEX "PizzaIngredient_pizzaId_ingredientId_key" ON "PizzaIngredient"("pizzaId", "ingredientId");
