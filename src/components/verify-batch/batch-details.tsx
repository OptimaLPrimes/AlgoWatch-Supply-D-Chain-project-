
"use client";
import type { Batch, TemperatureLog } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, MapPin, CalendarDays, Package, FileText, AlertTriangle, Truck, CheckCircle2, Factory } from "lucide-react";
import { MapPlaceholder } from "@/components/shared/map-placeholder";
import { Timeline } from "@/components/shared/timeline";
import { QrCodeDisplay } from "@/components/batches/qr-code-display";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from '@/components/ui/chart';
import { getIconForStatus } from "@/data/mock-data";

interface BatchDetailsProps {
  batch: Batch;
}

const chartConfig = {
  temperature: {
    label: "Temperature (°C)",
    color: "hsl(var(--primary))",
  },
  limit: {
    label: "Limit (°C)",
    color: "hsl(var(--destructive))",
  }
} satisfies Parameters<typeof ChartContainer>[0]["config"];


export function BatchDetails({ batch }: BatchDetailsProps) {
  const StatusIcon = getIconForStatus(batch.status);

  const isTemperatureBreached = batch.temperatureLogs.some(log => log.temperatureCelsius > batch.temperatureLimitCelsius) ||
                               (batch.checkpoints.some(cp => cp.temperatureCelsius && cp.temperatureCelsius > batch.temperatureLimitCelsius));
  
  const chartData = batch.temperatureLogs.map(log => ({
    time: new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temperature: log.temperatureCelsius,
    limit: batch.temperatureLimitCelsius,
  }));


  return (
    <div className="space-y-6">
      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="bg-muted/30 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-3xl font-headline flex items-center gap-2">
                <Package className="h-8 w-8 text-primary" /> Batch Details: {batch.id}
              </CardTitle>
              <CardDescription className="mt-1">
                Tracking information for {batch.productName}.
              </CardDescription>
            </div>
            <Badge 
              variant={isTemperatureBreached ? "destructive" : batch.status === "Delivered" ? "default" : "secondary"} 
              className="px-4 py-2 text-sm flex items-center gap-2"
            >
              <StatusIcon className="h-5 w-5" />
              Current Status: {batch.status}
              {isTemperatureBreached && <AlertTriangle className="h-5 w-5 ml-1 text-destructive-foreground" />}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-3">
            <InfoItem icon={Package} label="Product" value={batch.productName} />
            <InfoItem icon={Factory} label="Origin" value={batch.origin} />
            <InfoItem icon={MapPin} label="Destination" value={batch.destination} />
            <InfoItem icon={MapPin} label="Current GPS" value={batch.currentLocationGps} />
            <InfoItem icon={Thermometer} label="Temp. Limit" value={`${batch.temperatureLimitCelsius}°C`} />
            <InfoItem icon={CalendarDays} label="Created On" value={new Date(batch.creationDate).toLocaleDateString()} />
          </div>
          <div className="md:col-span-2">
             {batch.qrCodeUrl && <QrCodeDisplay qrCodeUrl={batch.qrCodeUrl} batchId={batch.id} />}
          </div>
        </CardContent>
        {batch.attachments && batch.attachments.length > 0 && (
           <CardFooter className="bg-muted/30 p-6 border-t">
            <div className="w-full">
              <h4 className="font-semibold mb-2 flex items-center gap-2"><FileText className="h-5 w-5 text-primary" />Attachments</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                {batch.attachments.map(att => (
                  <li key={att.name}>
                    <a href={att.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {att.name} ({att.type})
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </CardFooter>
        )}
      </Card>
      
      {isTemperatureBreached && (
        <Card className="border-destructive bg-destructive/10 shadow-lg">
          <CardHeader className="flex flex-row items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <div>
              <CardTitle className="text-destructive font-headline">Temperature Alert!</CardTitle>
              <CardDescription className="text-destructive/80">
                Temperature has exceeded the limit of {batch.temperatureLimitCelsius}°C for this batch.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MapPlaceholder 
          centerGps={batch.currentLocationGps} 
          markers={[
            { gps: batch.checkpoints[0]?.gpsCoordinates || batch.currentLocationGps, label: batch.origin },
            ...batch.checkpoints.map(cp => ({ gps: cp.gpsCoordinates, label: cp.locationName })),
            { gps: batch.destination, label: `Dest: ${batch.destination}` } 
          ]}
          routePolyline={[batch.checkpoints[0]?.gpsCoordinates, ...batch.checkpoints.map(cp => cp.gpsCoordinates), batch.currentLocationGps].filter(Boolean) as string[]}
        />
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><Thermometer className="h-6 w-6 text-primary"/>Temperature Log</CardTitle>
            <CardDescription>Real-time and historical temperature readings.</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend content={<ChartLegendContent />} />
                    <Line type="monotone" dataKey="temperature" stroke="var(--color-temperature)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="limit" stroke="var(--color-limit)" strokeDasharray="5 5" strokeWidth={2} dot={false} name="Temperature Limit" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : <p className="text-muted-foreground">No temperature data available.</p>}
          </CardContent>
        </Card>
      </div>

      <Timeline items={batch.checkpoints} />
    </div>
  );
}

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start">
      <Icon className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

