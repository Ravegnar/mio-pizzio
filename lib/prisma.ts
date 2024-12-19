import { PrismaClient } from "@prisma/client";

// Globální proměnná v Node.js
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Pokud už existuje instance, použij ji, jinak vytvoř novou
export const prisma = globalForPrisma.prisma || new PrismaClient();

// V development módu uloží instanci Prisma Clienta do global objektu
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
