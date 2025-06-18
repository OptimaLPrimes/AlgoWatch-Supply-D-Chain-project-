
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "next-themes"; // Assuming next-themes for dark mode

import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { DashboardHeader } from "@/components/dashboard/header";
import { getSimulatedUser, simulateLogout } from "@/lib/auth";
import type { User } from "@/types";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const currentUser = getSimulatedUser();
    if (!currentUser) {
      router.replace("/"); // Redirect to login if not authenticated
    } else {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    simulateLogout();
    setUser(null);
    router.replace("/");
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }
  
  if (!user) return null; // Or a more specific loading/redirect component

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider defaultOpen>
        <SidebarNav user={user} onLogout={handleLogout} />
        <SidebarInset className="flex flex-col">
            <DashboardHeader user={user} onLogout={handleLogout} />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              {children}
            </main>
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </ThemeProvider>
  );
}
