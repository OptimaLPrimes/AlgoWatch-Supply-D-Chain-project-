
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PackagePlus, SearchCheck, AlertCircle, Settings, LogOut, UserCircle, Package, Users, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem, User } from "@/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar"; // Assuming this is your custom sidebar component

interface SidebarNavProps {
  user: User | null;
  onLogout: () => void;
}

const getNavItems = (role?: User["role"]): NavItem[] => {
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
    items = [...baseItems, ...adminItems];
  }

  return items.filter(item => !item.roles || (role && item.roles.includes(role)));
};


export function SidebarNav({ user, onLogout }: SidebarNavProps) {
  const pathname = usePathname();
  const navItems = getNavItems(user?.role);

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Package className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-headline font-semibold">ChainWatch</h1>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        {user && (
          <SidebarGroup className="mb-4 p-2 border rounded-md bg-card">
            <SidebarGroupContent className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.name} />
                <AvatarFallback>{user.name?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.role}</p>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link href={item.href}>
                <SidebarMenuButton
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"
                  )}
                  isActive={pathname === item.href}
                  tooltip={{ content: item.title, side: 'right' }}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <Separator className="my-2" />
      
      <SidebarFooter className="p-4">
        <Button variant="ghost" className="w-full justify-start" onClick={onLogout}>
          <LogOut className="mr-2 h-5 w-5" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

