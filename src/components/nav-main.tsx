import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react";
import { LucideIcon } from "lucide-react";
import { type Icon as PhosporIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: PhosporIcon | LucideIcon | Icon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2 mt-5">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="">
              <SidebarMenuButton
                tooltip={item.title}
                className="py-5.5 hover:bg-primary/90 group hover:text-primary-foreground active:bg-primary active:text-primary-foreground duration-200 ease-linear flex items-center gap-2"
              >
                {item.icon && <item.icon className="size-4"/>}
                <span className="text-base">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
