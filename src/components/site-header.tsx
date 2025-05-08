import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Bell } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

export function SiteHeader() {
  const { user: test } = useAuthStore();
  return (
    <header className="bg-white flex py-5 pr-6  h-(--header-height) shrink-0 items-center gap-2 border-b border-border-gray transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {/* <h1 className="text-base font-medium">Documents</h1> */}
        <div className="ml-auto flex items-center gap-2">
          <button className="relative bg-[#F6F6F6] p-3 rounded-md hover:bg-primary cursor-pointer group">
            <Bell className="size-6 group-hover:text-white" />

            <span className="bg-[#EA3030] absolute top-1.5 right-1 text-white text-[0.585rem] flex justify-center items-center font-medium rounded-[2px] w-3.5 h-3">
              8
            </span>
          </button>

          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-10"
          />

          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <>
              <Avatar className="size-12 rounded-lg grayscale">
                <AvatarImage
                  src={test?.businessName}
                  alt={test?.businessName}
                />
                <AvatarFallback className="rounded-md">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium capitalize text-base">
                  {test?.businessName}
                </span>
                <span className="truncate text-xs text-[#727272]">
                  {test?.email}
                </span>
              </div>
            </>
          </Button>
        </div>
      </div>
    </header>
  );
}
