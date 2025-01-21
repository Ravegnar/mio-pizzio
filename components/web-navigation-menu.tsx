"use client";

import {
   NavigationMenu,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
   navigationMenuTriggerStyle,
} from "@ui/navigation-menu";
import HeaderAuth from "@/components/header-auth";
import Link from "next/link";
import { User } from "@supabase/auth-js";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";

const MENU_ITEMS = [
   { label: "Pizzas", href: "/" },
   { label: "TODO", href: "/todo" },
];

interface Props {
   user: User | null;
}

export function WebNavigationMenu(props: Props) {
   const pathname = usePathname();

   //TODO Mobile navigation

   return (
      <nav className="w-full border-b border-b-foreground/10">
         <div className="container max-sm:px-4 max-md:px-6">
            <div className="relative h-16">
               <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                  <Link href="/" passHref legacyBehavior>
                     <a className="text-lg font-bold">Logo</a>
                  </Link>
               </div>
               <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <NavigationMenu>
                     <NavigationMenuList>
                        {MENU_ITEMS.map((item) => (
                           <NavigationMenuItem key={item.href}>
                              <Link href={item.href} legacyBehavior passHref>
                                 <NavigationMenuLink
                                    className={cn(
                                       navigationMenuTriggerStyle(),
                                       pathname === item.href && "bg-primary text-primary-foreground",
                                    )}
                                 >
                                    {item.label}
                                 </NavigationMenuLink>
                              </Link>
                           </NavigationMenuItem>
                        ))}
                     </NavigationMenuList>
                  </NavigationMenu>
               </div>
               <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                  <HeaderAuth user={props.user} />
               </div>
            </div>
         </div>
      </nav>
   );
}
