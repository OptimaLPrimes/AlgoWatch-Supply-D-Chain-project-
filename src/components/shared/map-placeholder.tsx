
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface MapPlaceholderProps {
  centerGps?: string; // "lat,lng"
  zoom?: number;
  markers?: { gps: string; label: string }[];
  routePolyline?: string[]; // Array of "lat,lng"
}

export function MapPlaceholder({ centerGps, zoom, markers, routePolyline }: MapPlaceholderProps) {
  // In a real map, these props would configure the map view.
  // For the placeholder, we just show a generic map image.
  return (
    <Card className="overflow-hidden shadow-md">
      <CardContent className="p-0">
        <div className="aspect-[16/9] w-full bg-muted flex items-center justify-center">
          <Image
            src="https://placehold.co/800x450.png/E0E0E0/B0B0B0?text=Live+Map+View"
            alt="Map placeholder showing route and checkpoints"
            width={800}
            height={450}
            className="object-cover w-full h-full"
            data-ai-hint="map location"
          />
        </div>
      </CardContent>
      {/* Optionally, you could list markers or route info here if needed for context */}
      {/* 
      {markers && markers.length > 0 && (
        <div className="p-4 border-t">
          <h4 className="font-medium text-sm mb-1">Key Locations:</h4>
          <ul className="text-xs text-muted-foreground list-disc list-inside">
            {markers.map(m => <li key={m.label}>{m.label} ({m.gps})</li>)}
          </ul>
        </div>
      )}
      */}
    </Card>
  );
}
