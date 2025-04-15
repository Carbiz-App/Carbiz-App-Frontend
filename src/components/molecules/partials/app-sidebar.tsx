import * as React from "react";
import { HouseSimple, HandCoins, Gear } from "@phosphor-icons/react";
import { LogOut, ShoppingBag } from "lucide-react";

import { IconCoins, IconSettings, IconUsers } from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";

import logo from "@/assets/images/logo.svg";
import { Button } from "@/components/ui/button";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: HouseSimple,
    },
    {
      title: "Orders",
      url: "#",
      icon: ShoppingBag,
    },
    {
      title: "Products",
      url: "#",
      icon: IconCoins,
    },
    {
      title: "Payouts",
      url: "#",
      icon: HandCoins,
    },
    {
      title: "Settings",
      url: "#",
      icon: Gear,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar backgroundColor="bg-white" collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/dashboard">
                <img src={logo} />
                {/* <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span> */}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Button variant="ghost" className="justify-start text-[#4F4C55] text-base pb-8" >
          <LogOut className="size-4" />
          Logout
        </Button>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar>
  );
}
