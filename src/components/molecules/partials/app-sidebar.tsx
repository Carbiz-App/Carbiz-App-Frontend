import * as React from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getFilteredNavItems } from "@/config/app-nav";
import { Link, useNavigate } from "react-router";

import logo from "@/assets/images/logo.svg";
import { useAuthStore } from "@/store/auth.store";
import CustomButton from "@/components/atoms/button/CustomButton";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { logout, user } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = React.useState<boolean>(false);
  const nav = useNavigate();

  const onLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    nav("/");
    setIsLoggingOut(false);
  };

  const filteredNavItems = getFilteredNavItems(user?.isApproved);

  return (
    <Sidebar backgroundColor="bg-white" {...props}>
      <SidebarHeader className="flex h-auto gap-2 px-4 pt-5 md:pt-10">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center-safe justify-between">
            <Link to="/dashboard">
              <img src={logo} alt="Carbiz" />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={filteredNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <CustomButton
          variant="ghost"
          className="justify-start text-base text-[#4F4C55]"
          onClick={onLogout}
          loading={isLoggingOut}
        >
          Logout
        </CustomButton>
      </SidebarFooter>
    </Sidebar>
  );
}
