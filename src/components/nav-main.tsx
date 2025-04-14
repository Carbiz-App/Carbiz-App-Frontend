import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react";

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
    icon?: string;
  }[];
}) {
  return (
    <SidebarGroup >
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="group">
              <SidebarMenuButton
                tooltip={item.title}
                className="py-5.5 hover:bg-primary/90 hover:text-primary-foreground active:bg-primary active:text-primary-foreground duration-200 ease-linear flex items-center gap-2"
              >
                {item.icon && (
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="size-5 object-contain filter group-hover:invert group-hover:brightness-10 transition duration-200"
                  />
                )}
                <span className="text-base">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
