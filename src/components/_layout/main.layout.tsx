import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/molecules/partials/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Outlet, useNavigate } from "react-router";
import { useMemo } from "react";
import { useAuthStore } from "@/store/auth.store";

const MainLayout = () => {
  const token = useMemo(() => localStorage.getItem("authToken"), []);
  const { user } = useAuthStore();
  const nav = useNavigate();

  if (!token && !user) {
    nav("/");
  }
  return (
    <SidebarProvider className="bg-">
      <AppSidebar />
      {/* <Sidebar  /> */}
      <SidebarInset className="bg-[#FBFBFC]">
        <SiteHeader />
        <div className=" p-5  md:p-10">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
