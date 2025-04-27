import * as React from "react";
import { HouseSimple, HandCoins, Gear } from "@phosphor-icons/react";
import { LogOut, ShoppingBag, UsersRound } from "lucide-react";

import { IconCoins } from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
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
      url: "/orders",
      icon: ShoppingBag,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: UsersRound,
    },
    {
      title: "Products",
      url: "/products",
      icon: IconCoins,
    },
    {
      title: "Payouts",
      url: "/payouts",
      icon: HandCoins,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Gear,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar backgroundColor="bg-white" {...props}>
      <SidebarHeader className="flex  gap-2 pt-10 h-auto px-4">
        <SidebarMenu>
          {/* <SidebarMenuItem className="flex "> */}
          {/* <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 flex"
            > */}
          <Link to="/dashboard">
            <img src={logo} />
          </Link>
          {/* </SidebarMenuButton> */}
          {/* </SidebarMenuItem> */}
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant="ghost"
          className="justify-start text-[#4F4C55] text-base"
        >
          <LogOut className="size-4" />
          Logout
        </Button>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar>
  );
}
