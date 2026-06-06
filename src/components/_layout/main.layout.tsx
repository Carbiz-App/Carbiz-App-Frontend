import { AppBottomNav } from "@/components/molecules/partials/app-bottom-nav";
import { AppSidebar } from "@/components/molecules/partials/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";

const MainLayout = () => {
  const { user } = useAuthStore();
  const nav = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token && user === null) {
      nav("/", { replace: true });
    }
  }, [user, nav]);

  return (
    <SidebarProvider>
      <div className="hidden lg:contents">
        <AppSidebar />
      </div>
      <SidebarInset className="flex min-h-screen flex-col bg-[#FBFBFC]">
        <div className="sticky top-0 z-40">
          <SiteHeader />
        </div>
        <main className="flex-1 p-4 pb-24 sm:p-5 md:p-8 lg:pb-10 lg:p-10 xl:p-14 2xl:p-20">
          <Outlet />
        </main>
      </SidebarInset>
      <AppBottomNav />
    </SidebarProvider>
  );
};

export default MainLayout;
