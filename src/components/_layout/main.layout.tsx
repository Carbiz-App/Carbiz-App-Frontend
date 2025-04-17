// import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/molecules/partials/app-sidebar";
// import { ChartAreaInteractive } from "@/components/chart-area-interactive";
// import { DataTable } from "@/components/data-table";
// import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <SidebarProvider className="bg-">
      <AppSidebar variant="inset" />
      <SidebarInset className="bg-[#FBFBFC]">
        <SiteHeader />
        <div className="p-10">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
