
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import Image from 'next/image';


export default function AdminAnalyticsPage() {
  return (
    <div className="container mx-auto py-2">
      <PageHeader
        title="System Analytics"
        description="Insights into overall system performance and supply chain data."
      />
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            Analytics Dashboard
          </CardTitle>
          <CardDescription>
            This page is a placeholder for system-wide analytics.
            Visualizations for temperature trends, completed vs. failed batches, and block confirmations will be displayed here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Detailed charts and graphs will provide a comprehensive overview of supply chain operations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Temperature Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <Image src="https://placehold.co/600x300.png/E0E0E0/B0B0B0?text=Temperature+Trend+Chart" alt="Temperature Trend Chart Placeholder" width={600} height={300} className="w-full rounded-md" data-ai-hint="graph chart" />
                <p className="text-xs text-muted-foreground mt-2 text-center">Placeholder for temperature trend graph.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Batch Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <Image src="https://placehold.co/600x300.png/E0E0E0/B0B0B0?text=Batch+Completion+Chart" alt="Batch Completion Chart Placeholder" width={600} height={300} className="w-full rounded-md" data-ai-hint="pie chart" />
                <p className="text-xs text-muted-foreground mt-2 text-center">Placeholder for completed vs. failed batches chart.</p>
              </CardContent>
            </Card>
          </div>
           <Card>
              <CardHeader>
                <CardTitle className="text-lg">Blockchain Transaction Explorer</CardTitle>
              </CardHeader>
              <CardContent>
                 <Image src="https://placehold.co/600x300.png/E0E0E0/B0B0B0?text=Block+Explorer+View" alt="Block Explorer Placeholder" width={600} height={300} className="w-full rounded-md" data-ai-hint="data list" />
                <p className="text-xs text-muted-foreground mt-2 text-center">Placeholder for block confirmation explorer.</p>
              </CardContent>
            </Card>

        </CardContent>
      </Card>
    </div>
  );
}
