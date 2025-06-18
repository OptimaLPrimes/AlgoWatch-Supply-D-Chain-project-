
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { User, NavItem } from "@/types";
import { Bell, Moon, Sun, Package as AppIcon, Menu, UserCircle, Settings, LogOut } from "lucide-react";
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
import { useTheme } from "next-themes";
import { getNavItems } from "@/components/dashboard/sidebar-nav"; // Re-use nav logic
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

interface DashboardHeaderProps {
  user: User | null;
  onLogout: () => void;
}

export function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  const { setTheme, theme } = useTheme() ?? { setTheme: () => {}, theme: 'light' };
  const [currentTheme, setCurrentTheme] = React.useState('light');
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const navItems = user ? getNavItems(user.role) : [];

  React.useEffect(() => {
    if (theme) setCurrentTheme(theme);
  }, [theme]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Trigger */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="flex h-full flex-col">
              <div className="p-4 border-b">
                <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <AppIcon className="h-7 w-7 text-primary" />
                  <h1 className="text-xl font-headline font-semibold">ChainWatch</h1>
                </Link>
              </div>
              <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.title}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                        pathname === item.href && "bg-primary/10 text-primary font-semibold"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              {user && (
                 <div className="mt-auto p-4 border-t">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <Avatar className="h-9 w-9">
                            <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.name} />
                            <AvatarFallback>{user.name?.[0]?.toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                            </div>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                            </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => { setMobileMenuOpen(false); alert("Profile page not implemented"); }}><UserCircle />Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setMobileMenuOpen(false); alert("Settings page not implemented"); }}><Settings />Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => { setMobileMenuOpen(false); onLogout();}}><LogOut />Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Logo and Title */}
        <Link href="/dashboard" className="hidden md:flex items-center gap-2">
          <AppIcon className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-headline font-semibold">ChainWatch</h1>
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-2 lg:gap-4">
        {navItems.slice(0, 4).map((item) => ( // Show a limited number of items directly, rest could be in a "More" dropdown if needed
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              "text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-2 py-1 rounded-md",
              pathname === item.href && "bg-primary/10 text-primary"
            )}
          >
            {item.title}
          </Link>
        ))}
        {/* Example for a "More" dropdown if many nav items */}
        {navItems.length > 4 && (
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">More</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {navItems.slice(4).map((item) => (
                <DropdownMenuItem key={item.title} asChild>
                  <Link href={item.href} className={cn("flex items-center gap-2", pathname === item.href && "bg-muted")}> {/* Added flex items-center gap-2 */}
                    <item.icon /> {/* Icon will be sized by DropdownMenuItem's CSS */}
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>

      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" size="icon" onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}>
          {currentTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        {user && (
          <div className="hidden md:block"> {/* Hide on mobile as it's in the sheet footer */}
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
                <DropdownMenuItem><UserCircle />Profile</DropdownMenuItem>
                <DropdownMenuItem><Settings />Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}><LogOut />Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
}
