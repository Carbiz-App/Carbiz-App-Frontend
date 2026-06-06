import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Bell, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { Link, useNavigate } from "react-router";
import logo from "@/assets/images/logo.svg";
import { AppNotifcations } from "./molecules/notifications";
import { useModal } from "@/store/useModal";
import { useState } from "react";

export function SiteHeader() {
  const { user, logout } = useAuthStore();
  const { appNotificationCount, openModal } = useModal();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const onLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      navigate("/");
      logout();
    }, 500);
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-border-gray bg-white p-2 sm:px-4 md:py-4">
      <div className="flex w-full items-center gap-2 px-2 sm:px-4 lg:gap-2 lg:px-12 xl:px-14 2xl:px-20">
        <Link to="/dashboard" className="shrink-0 lg:hidden">
          <img src={logo} alt="Carbiz" className="size-10 sm:size-12" />
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <AppNotifcations>
            <button
              type="button"
              className="group relative cursor-pointer rounded-md bg-[#F6F6F6] p-2 hover:bg-primary md:p-3"
              onClick={() => openModal({ type: "popover" })}
              aria-label="Notifications"
            >
              <Bell className="size-4 sm:size-6 group-hover:text-white" />
              <span className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-[#EA3030] text-[0.585rem] font-medium text-white sm:right-1.5 sm:top-1.5">
                {appNotificationCount}
              </span>
            </button>
          </AppNotifcations>

          <Separator
            orientation="vertical"
            className="mx-1 data-[orientation=vertical]:h-8 sm:mx-2 sm:data-[orientation=vertical]:h-10"
          />

          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <>
              <Avatar className="size-9 rounded-lg grayscale sm:size-10 lg:size-12">
                <AvatarImage
                  src={user?.businessPics}
                  alt={user?.businessName}
                />
                <AvatarFallback className="rounded-md font-bold md:text-lg" />
              </Avatar>
              <div className="hidden flex-1 text-left text-sm leading-tight sm:grid">
                <span className="truncate font-medium capitalize md:text-base">
                  {user?.businessName}
                </span>
                <span className="truncate text-[#727272] md:text-xs">
                  {user?.email}
                </span>
              </div>
            </>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onLogout}
            disabled={isLoggingOut}
            aria-label="Log out"
            title="Log out"
            className="text-[#4F4C55] hover:text-primary lg:hidden"
          >
            <LogOut className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
