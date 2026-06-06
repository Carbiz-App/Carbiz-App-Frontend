import { cn } from "@/lib/utils";
import { APP_NAV_ITEMS, getFilteredNavItems } from "@/config/app-nav";
import { useAuthStore } from "@/store/auth.store";
import { Link, useLocation } from "react-router";

export function AppBottomNav() {
  const { user } = useAuthStore();
  const { pathname } = useLocation();
  const navItems = getFilteredNavItems(user?.isApproved);

  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border-gray bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="mx-auto flex h-16 max-w-lg items-stretch justify-around px-1 sm:max-w-xl md:max-w-2xl">
        {navItems.map((item) => {
          const isActive =
            pathname === item.url || pathname.startsWith(`${item.url}/`);
          const Icon = item.icon;

          return (
            <li key={item.url} className="flex flex-1">
              <Link
                to={item.url}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-[10px] font-medium transition-colors sm:text-xs",
                  isActive
                    ? "text-primary"
                    : "text-[#837E8E] hover:text-primary/80",
                )}
              >
                <Icon
                  className={cn(
                    "size-5 sm:size-6",
                    isActive ? "text-primary" : "text-[#837E8E]",
                  )}
                />
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { APP_NAV_ITEMS };
