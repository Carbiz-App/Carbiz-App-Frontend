import { Gear, HandCoins, HouseSimple } from "@phosphor-icons/react";
import { type Icon as PhosphorIcon } from "@phosphor-icons/react";
import { type Icon as TablerIcon } from "@tabler/icons-react";
import { IconCoins } from "@tabler/icons-react";
import { LucideIcon, ShoppingBag } from "lucide-react";

export type AppNavItem = {
  title: string;
  url: string;
  icon: PhosphorIcon | LucideIcon | TablerIcon;
  requiresVerification?: boolean;
};

export const APP_NAV_ITEMS: AppNavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: HouseSimple,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ShoppingBag,
    requiresVerification: true,
  },
  {
    title: "Products",
    url: "/products",
    icon: IconCoins,
    requiresVerification: true,
  },
  {
    title: "Payouts",
    url: "/payouts",
    icon: HandCoins,
    requiresVerification: true,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Gear,
  },
];

export const getFilteredNavItems = (isApproved?: boolean) =>
  isApproved
    ? APP_NAV_ITEMS
    : APP_NAV_ITEMS.filter((item) => !item.requiresVerification);
