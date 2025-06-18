
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PackagePlus, SearchCheck, AlertCircle, Settings, LogOut, UserCircle, Package, Users, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem, User } from "@/types";
// Note: Button, Separator, Avatar are not directly used in the UI of this file anymore
// but getNavItems is exported and used by the new header.

// This function is EXPORTED and used by the new Navbar (header.tsx)
export const getNavItems = (role?: User["role"]): NavItem[] => {
  const baseItems: NavItem[] = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Register Batch", href: "/batches/register", icon: PackagePlus, roles: ["Admin", "Manufacturer"] },
    { title: "Manage Batches", href: "/batches", icon: Package, roles: ["Admin", "Manufacturer", "Distributor"] },
    { title: "Verify Batch", href: "/verify-batch", icon: SearchCheck },
    { title: "Alerts & AI", href: "/alerts", icon: AlertCircle, roles: ["Admin", "Manufacturer", "Distributor"] },
  ];

  const adminItems: NavItem[] = [
    { title: "User Management", href: "/admin/users", icon: Users, roles: ["Admin"] },
    { title: "System Analytics", href: "/admin/analytics", icon: BarChart3, roles: ["Admin"] },
    { title: "Settings", href: "/settings", icon: Settings, roles: ["Admin"] },
  ];
  
  let items = baseItems;
  if (role === "Admin") {
    // For Admin, include all base items and admin-specific items.
    // Ensure Settings is included and potentially distinct if it was meant for all.
    const allAdminItems = [...baseItems.filter(item => item.href !== "/settings"), ...adminItems];
    // Deduplicate items by href, giving preference to adminItems if conflicts (e.g. Settings)
    const itemMap = new Map<string, NavItem>();
    allAdminItems.forEach(item => itemMap.set(item.href, item));
    items = Array.from(itemMap.values());
  }


  return items.filter(item => !item.roles || (role && item.roles.includes(role)))
    .sort((a,b) => { // Optional: maintain a specific order
        const order = ["/dashboard", "/batches/register", "/batches", "/verify-batch", "/alerts", "/admin/users", "/admin/analytics", "/settings"];
        return order.indexOf(a.href) - order.indexOf(b.href);
    });
};


// The rest of this component (SidebarNav UI) is no longer directly used in the main layout.
// It's kept here as the source of `getNavItems` or could be further refactored into a pure utility file.
export function SidebarNav({ user, onLogout }: { user: User | null; onLogout: () => void; }) {
  const pathname = usePathname();
  const navItems = getNavItems(user?.role);

  // This UI will not be rendered as SidebarNav is removed from layout.tsx
  // However, keeping the structure for `getNavItems` to be importable.
  if (!user) return null;

  return (
    <div className="hidden lg:block border-r bg-muted/40 p-4">
      <nav className="grid items-start gap-2 text-sm font-medium">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <AppIcon className="h-6 w-6" />
          ChainWatch
        </Link>
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              pathname === item.href && "bg-muted text-primary"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
