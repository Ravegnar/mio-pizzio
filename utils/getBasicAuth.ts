//import { cookies } from "next/headers";

export async function getBasicAuth(): Promise<boolean> {
   const AUTH_KEY = process.env.AUTH_KEY;

   if (!AUTH_KEY) return false;

   return true; // TODO vypnutí cookies AUTH (await cookies()).has(AUTH_KEY)
}
