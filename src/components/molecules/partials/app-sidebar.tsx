import * as React from "react";
import { HouseSimple, HandCoins, Gear } from "@phosphor-icons/react";
import { ShoppingBag } from "lucide-react";

import { IconCoins } from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router";

import logo from "@/assets/images/logo.svg";
import { useAuthStore } from "@/store/auth.store";
import CustomButton from "@/components/atoms/button";

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
      requiresVerification: true,
    },
    {
      title: "Products",
      url: "/products",
      icon: IconCoins,
      requiresVerification: true,
    },
    {
      title: "Payouts",
      url: "/payouts",
      icon: HandCoins,
      requiresVerification: true,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Gear,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { logout, user } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = React.useState<boolean>(false);
  const nav = useNavigate();
  const onLogout = () => {
    setIsLoggingOut(true);
    logout();
    setTimeout(() => {
      nav("/");
    }, 2000);
  };

  const filteredNavItems = user?.isApproved
    ? data.navMain
    : data.navMain.filter((item) => !item.requiresVerification);

  return (
    <Sidebar backgroundColor="bg-white" {...props}>
      <SidebarHeader className="flex  gap-2 pt-5 md:pt-10 h-auto px-4">
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-between items-center-safe ">
            {/* <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 flex"
            > */}
            <Link to="/dashboard">
              <img src={logo} />
            </Link>
            {/* </SidebarMenuButton> */}
            {/* <div className="flex gap-1 md:hidden items-center"> */}
            <SidebarTrigger className="md:hidden " />
            {/* </div> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={filteredNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <CustomButton
          variant="ghost"
          className="justify-start text-[#4F4C55] text-base"
          onClick={onLogout}
          loading={isLoggingOut}
        >
          Logout
        </CustomButton>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar>
  );
}
