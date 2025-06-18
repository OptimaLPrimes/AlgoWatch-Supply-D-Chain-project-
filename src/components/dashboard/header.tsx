
"use client";

import type { User } from "@/types";
import { Bell, Moon, Sun, AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes"; // Assuming next-themes is or will be installed for dark mode
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {useEffect, useState} from "react";


interface DashboardHeaderProps {
  user: User | null;
  onLogout: () => void;
}

export function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  const { setTheme, theme } = useTheme() ?? { setTheme: () => {}, theme: 'light' }; // Provide default if useTheme is undefined
  const { toggleSidebar } = useSidebar();
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    if (theme) setCurrentTheme(theme);
  }, [theme]);


  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-2">
         <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
           <AlignLeft className="h-5 w-5" />
           <span className="sr-only">Toggle Sidebar</span>
         </Button>
        <h1 className="text-xl font-semibold font-headline">
          {user?.role ? `${user.role} Dashboard` : "Dashboard"}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}>
          {currentTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.name} />
                  <AvatarFallback>{user.name?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
