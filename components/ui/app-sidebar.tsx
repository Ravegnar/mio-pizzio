"use client";

import { AudioWaveform, Command, CookingPot, LayoutDashboard, Pizza, Store } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { ComponentProps } from "react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";

// This is sample data.
const data = {
   user: {
      name: "Lukas",
      email: "m@example.com",
      avatar: "/favicon.ico",
   },
   teams: [
      {
         name: "Pizzeria name",
         logo: Store,
         plan: "Enterprise",
      },
      {
         name: "Acme Corp.",
         logo: AudioWaveform,
         plan: "Startup",
      },
      {
         name: "Evil Corp.",
         logo: Command,
         plan: "Free",
      },
   ],
   navMain: [
      {
         title: "Dashboard",
         icon: LayoutDashboard,
         isActive: true,
         url: "/admin",
      },
      {
         title: "Pizzas",
         icon: Pizza,
         isActive: true,
         url: "/admin/pizzas",
      },
      {
         title: "Ingredients",
         icon: CookingPot,
         isActive: true,
         url: "/admin/ingredients",
      },
      /*{
         title: "Playground",
         url: "#",
         icon: SquareTerminal,
         isActive: true,
         items: [
            {
               title: "Pizzas",
               url: "/admin/pizzas",
            },
            {
               title: "Ingredients",
               url: "/admin/ingredients",
            },
            {
               title: "Settings",
               url: "#",
            },
         ],
      },*/
   ],
   /*projects: [
      {
         name: "Design Engineering",
         url: "#",
         icon: Frame,
      },
      {
         name: "Sales & Marketing",
         url: "#",
         icon: PieChart,
      },
      {
         name: "Travel",
         url: "#",
         icon: Map,
      },
   ],*/
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
   return (
      <Sidebar collapsible="icon" variant="floating" {...props}>
         <SidebarHeader>
            <TeamSwitcher teams={data.teams} />
         </SidebarHeader>
         <SidebarContent>
            <NavMain items={data.navMain} />
            {/*<NavProjects projects={data.projects} />*/}
         </SidebarContent>
         <SidebarFooter>
            <NavUser user={data.user} />
         </SidebarFooter>
         <SidebarRail />
      </Sidebar>
   );
}
