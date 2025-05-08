import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/molecules/partials/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <SidebarProvider className="bg-">
      <AppSidebar />
      <SidebarInset className="bg-[#FBFBFC]">
        <SiteHeader />
        <div className=" p-5 md:p-10">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
