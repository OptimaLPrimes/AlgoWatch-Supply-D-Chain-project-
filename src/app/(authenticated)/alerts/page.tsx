
import { PageHeader } from "@/components/shared/page-header";
import { RiskPredictionForm } from "@/components/alerts/risk-prediction-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, BellRing, ThermometerSnowflake } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertsPage() {
  // Mock data for active alerts - in a real app, this would come from a backend/state
  const activeAlerts = [
    { id: "ALERT001", batchId: "BATCH001", type: "Temperature Breach", severity: "High", message: "Temperature exceeded 8°C, currently 9.5°C.", timestamp: new Date().toISOString() },
    { id: "ALERT002", batchId: "BATCH007", type: "Potential Delay", severity: "Medium", message: "Route congestion detected, potential 2-hour delay.", timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
  ];

  return (
    <div className="container mx-auto py-2">
      <PageHeader
        title="Alerts & AI Insights"
        description="Monitor real-time cold chain alerts and leverage AI for risk prediction."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><BellRing className="h-6 w-6 text-accent" />Active Cold Chain Alerts</CardTitle>
            <CardDescription>Critical warnings requiring immediate attention.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeAlerts.length > 0 ? (
              activeAlerts.map(alert => (
                <Alert key={alert.id} variant={alert.severity === "High" ? "destructive" : "default"} className="bg-background">
                  <AlertTriangle className={`h-5 w-5 ${alert.severity === "High" ? "text-destructive" : "text-yellow-500"}`} />
                  <AlertTitle className="font-semibold">{alert.type} on Batch {alert.batchId} 
                    <Badge variant={alert.severity === "High" ? "destructive" : "secondary"} className="ml-2">{alert.severity}</Badge>
                  </AlertTitle>
                  <AlertDescription>
                    {alert.message}
                    <span className="block text-xs text-muted-foreground mt-1">
                      {new Date(alert.timestamp).toLocaleString()}
                    </span>
                  </AlertDescription>
                </Alert>
              ))
            ) : (
              <div className="text-center py-6">
                <ThermometerSnowflake className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <p className="text-muted-foreground">No active alerts. All systems nominal.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Placeholder for simulated IoT sensor data feed */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><ThermometerSnowflake className="h-6 w-6 text-primary" />Simulated IoT Sensor Feed</CardTitle>
            <CardDescription>Real-time temperature updates from a simulated sensor.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-lg bg-muted/30">
              <p className="text-sm">
                <span className="font-semibold">Batch BATCH001 (Vaccine):</span> Current Temp: <span className="text-lg font-bold text-blue-600 dark:text-blue-400">4.5°C</span> (Stable)
              </p>
              <p className="text-xs text-muted-foreground">Last update: Just now. Location: Near Frankfurt.</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "56.25%" }}></div> {/* (4.5 / 8) * 100 */}
              </div>
               <p className="text-sm mt-3">
                <span className="font-semibold">Batch BATCH004 (Sensitive Cargo):</span> Current Temp: <span className="text-lg font-bold text-red-600 dark:text-red-400">9.2°C</span> (High!)
              </p>
              <p className="text-xs text-muted-foreground">Last update: 1 min ago. Location: Near Nuremberg. Limit: 5°C</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                 <div className="bg-destructive h-2.5 rounded-full" style={{ width: "100%" }}></div>
              </div>
            </div>
            <p className="text-xs text-center mt-3 text-muted-foreground">Note: This is simulated data for demonstration.</p>
          </CardContent>
        </Card>
      </div>

      <RiskPredictionForm />
    </div>
  );
}
