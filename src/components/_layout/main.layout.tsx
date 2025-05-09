import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/molecules/partials/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";

const MainLayout = () => {
  const { user } = useAuthStore();
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token && user === null) {
      nav("/");
    }
  }, [user, nav]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#FBFBFC]">
        <SiteHeader />
        <div className="p-5 md:p-10">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
