
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardOverviewCardData } from "@/types";
import { cn } from "@/lib/utils";

export function OverviewCard({ title, value, icon: Icon, trend, bgColorClass = "bg-card", textColorClass = "text-card-foreground" }: DashboardOverviewCardData) {
  return (
    <Card className={cn("shadow-lg hover:shadow-xl transition-shadow duration-300", bgColorClass)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn("h-5 w-5 text-muted-foreground", textColorClass)} />
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold font-headline", textColorClass)}>{value}</div>
        {trend && <p className="text-xs text-muted-foreground pt-1">{trend}</p>}
      </CardContent>
    </Card>
  );
}
