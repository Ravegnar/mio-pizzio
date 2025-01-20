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

interface Props {
   user: User | null;
}

export function WebNavigationMenu(props: Props) {
   return (
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
         <div className="w-full max-w-5xl flex justify-end items-center p-3 px-5 text-sm">
            <NavigationMenu>
               <NavigationMenuList>
                  <NavigationMenuItem>
                     <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Pizzas</NavigationMenuLink>
                     </Link>
                  </NavigationMenuItem>
               </NavigationMenuList>
            </NavigationMenu>
            <HeaderAuth user={props.user} />
         </div>
      </nav>
   );
}
