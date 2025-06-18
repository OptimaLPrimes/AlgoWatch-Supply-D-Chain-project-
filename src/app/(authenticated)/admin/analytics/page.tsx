
"use client";
import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, LineChartIcon, PieChartIcon, ListChecks } from "lucide-react";
import Image from 'next/image';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend as RechartsLegend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartLegend as ShadcnChartLegend, ChartLegendContent } from '@/components/ui/chart';

const temperatureTrendData = [
  { month: "Jan", avgTemp: 2.1, anomalies: 1 },
  { month: "Feb", avgTemp: 3.5, anomalies: 0 },
  { month: "Mar", avgTemp: 6.0, anomalies: 2 },
  { month: "Apr", avgTemp: 9.5, anomalies: 1 },
  { month: "May", avgTemp: 14.2, anomalies: 0 },
  { month: "Jun", avgTemp: 18.5, anomalies: 3 },
];

const temperatureChartConfig = {
  avgTemp: {
    label: "Avg. Temp (°C)",
    color: "hsl(var(--chart-1))",
  },
  anomalies: {
    label: "Anomalies",
    color: "hsl(var(--chart-2))",
  },
} satisfies Parameters<typeof ChartContainer>[0]["config"];

const batchCompletionData = [
  { name: 'Completed', value: 450, fill: "hsl(var(--chart-1))" },
  { name: 'Failed (Temp Breach)', value: 35, fill: "hsl(var(--chart-2))" },
  { name: 'Failed (Other)', value: 15, fill: "hsl(var(--chart-3))" },
];

const batchCompletionChartConfig = {
  value: {
    label: "Batches",
  },
  Completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  "Failed (Temp Breach)": {
    label: "Failed (Temp Breach)",
    color: "hsl(var(--chart-2))",
  },
  "Failed (Other)": {
    label: "Failed (Other)",
    color: "hsl(var(--chart-3))",
  }
} satisfies Parameters<typeof ChartContainer>[0]["config"];


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
            Visualizations for temperature trends, batch completion rates, and an overview of blockchain transactions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <LineChartIcon className="h-5 w-5 text-primary" />
                  Monthly Temperature Trends
                </CardTitle>
                <CardDescription>Average temperature and reported anomalies per month.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={temperatureChartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={temperatureTrendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" dataKey="anomalies" />
                      <RechartsTooltip content={<ChartTooltipContent />} />
                      <ShadcnChartLegend content={<ChartLegendContent />} />
                      <Line yAxisId="left" type="monotone" dataKey="avgTemp" stroke="var(--color-avgTemp)" strokeWidth={2} name="Avg. Temp (°C)" />
                      <Line yAxisId="right" type="step" dataKey="anomalies" stroke="var(--color-anomalies)" strokeWidth={2} name="Anomalies" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-primary" />
                  Batch Completion Rate
                </CardTitle>
                 <CardDescription>Distribution of completed vs. failed batches.</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ChartContainer config={batchCompletionChartConfig} className="h-[300px] w-[300px] sm:w-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <RechartsTooltip content={<ChartTooltipContent hideLabel />} />
                      <Pie
                        data={batchCompletionData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        labelLine={false}
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                          const RADIAN = Math.PI / 180;
                          const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);
                          return (
                            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="10px">
                              {`${(percent * 100).toFixed(0)}%`}
                            </text>
                          );
                        }}
                      >
                        {batchCompletionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ShadcnChartLegend content={<ChartLegendContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
           
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-primary" />
                Blockchain Transaction Explorer
              </CardTitle>
              <CardDescription>Overview of recent blockchain interactions (conceptual).</CardDescription>
            </CardHeader>
            <CardContent>
                 <Image src="https://placehold.co/800x300.png/E0E0E0/B0B0B0?text=Conceptual+Block+Explorer+View" alt="Block Explorer Placeholder" width={800} height={300} className="w-full rounded-md" data-ai-hint="data list table" />
                <p className="text-xs text-muted-foreground mt-2 text-center">Placeholder: A full block explorer is a complex feature. This represents a conceptual view of transaction data.</p>
            </CardContent>
          </Card>

        </CardContent>
      </Card>
    </div>
  );
}
