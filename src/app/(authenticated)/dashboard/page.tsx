
"use client";
import * as React from "react";
import { OverviewCard } from "@/components/dashboard/overview-card";
import { PageHeader } from "@/components/shared/page-header";
import { mockDashboardCards, getIconForStatus } from "@/data/mock-data";
import type { User, Batch } from "@/types";
import { getSimulatedUser } from "@/lib/auth";
import { useBatchManager } from "@/hooks/use-batch-manager"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = React.useState<User | null>(null);
  const { batches } = useBatchManager(); 
  const [recentBatches, setRecentBatches] = React.useState<Batch[]>([]);

  React.useEffect(() => {
    const currentUser = getSimulatedUser();
    setUser(currentUser);
  }, []);

  React.useEffect(() => {
    
    const sortedBatches = [...batches].sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
    setRecentBatches(sortedBatches.slice(0, 5));
  }, [batches]); 

  const dashboardCardsData = user ? mockDashboardCards(user.role, batches) : [];

  return (
    <div className="container mx-auto py-2">
      <PageHeader title="Dashboard Overview" description={`Welcome back, ${user?.name || 'User'}!`} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
        {dashboardCardsData.map((card) => (
          <OverviewCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline">Recent Batch Activity</CardTitle>
            <CardDescription>Overview of the latest batch updates.</CardDescription>
          </CardHeader>
          <CardContent>
            {recentBatches.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Update</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBatches.map((batch) => {
                    const StatusIcon = getIconForStatus(batch.status);
                    const lastTimestamp = batch.checkpoints.length > 0 
                                          ? batch.checkpoints[batch.checkpoints.length -1].timestamp 
                                          : batch.creationDate;
                    return (
                      <TableRow key={batch.id}>
                        <TableCell className="font-medium">
                          <Link href={`/verify-batch?id=${batch.id}`} className="text-primary hover:underline">
                            {batch.id}
                          </Link>
                        </TableCell>
                        <TableCell>{batch.productName}</TableCell>
                        <TableCell>
                          <Badge variant={batch.status === 'Issue' ? 'destructive' : batch.status === 'Delivered' ? 'default' : 'secondary'} className="flex items-center gap-1.5">
                            <StatusIcon className="h-3.5 w-3.5" />
                            {batch.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(lastTimestamp).toLocaleDateString()}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground">No recent batch activity.</p>
            )}
            <div className="mt-4 flex justify-end">
              <Button variant="link" asChild>
                <Link href="/batches">View All Batches <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-xl">
           <CardHeader>
            <CardTitle className="font-headline">Quick Actions</CardTitle>
            <CardDescription>Common tasks at your fingertips.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button asChild size="lg" className="w-full">
              <Link href="/batches/register">Register New Batch</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/verify-batch">Verify a Batch</Link>
            </Button>
             <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/alerts">View Alerts</Link>
            </Button>
             <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/admin/analytics">System Analytics</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
