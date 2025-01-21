"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
   const pathname = usePathname();

   //TODO
   return (
      <div>
         <h2>Not Found</h2>
         <p>Could not find requested resource</p>
         <Link href={pathname.includes("admin") ? "/admin" : "/"}>Return Home</Link>
      </div>
   );
}
