
import type { Checkpoint } from "@/types";
import { getIconForRole } from "@/data/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Clock, MapPin as LocationPin, Edit2 } from "lucide-react"; // Renamed MapPin to avoid conflict

interface TimelineProps {
  items: Checkpoint[];
}

export function Timeline({ items }: TimelineProps) {
  if (!items || items.length === 0) {
    return <p className="text-muted-foreground">No checkpoint history available.</p>;
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Checkpoint History</CardTitle>
        <CardDescription>Chronological record of batch movements and status updates.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-border">
          {items.map((item, index) => {
            const HandlerIcon = getIconForRole(item.handlerRole);
            return (
              <div key={item.id} className="relative mb-8 grid grid-cols-[auto_1fr] items-start gap-x-4">
                <div className="absolute -left-[25px] top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                  <HandlerIcon className="h-5 w-5" />
                </div>
                <div className="col-start-2">
                  <div className="rounded-lg border bg-card p-4 shadow-sm">
                    <p className="text-sm font-semibold text-primary">{item.locationName}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {new Date(item.timestamp).toLocaleString()} by {item.handlerRole}
                    </p>
                    <div className="mt-2 space-y-1 text-sm">
                      <p className="flex items-center gap-1">
                        <LocationPin className="h-4 w-4 text-muted-foreground" /> GPS: {item.gpsCoordinates}
                      </p>
                      {item.temperatureCelsius !== undefined && (
                        <p className="flex items-center gap-1">
                          <Thermometer className="h-4 w-4 text-muted-foreground" /> Temp: {item.temperatureCelsius}°C
                        </p>
                      )}
                      {item.notes && (
                         <p className="flex items-center gap-1 text-xs italic text-muted-foreground pt-1">
                          <Edit2 className="h-3 w-3"/> Notes: {item.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
