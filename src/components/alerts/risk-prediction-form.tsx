
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BrainCircuit, Sparkles, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { predictRiskyBatches, type PredictRiskyBatchesInput, type PredictRiskyBatchesOutput } from "@/ai/flows/predict-risky-batches";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const riskPredictionSchema = z.object({
  batchData: z.string().min(50, "Please provide detailed historical batch data (at least 50 characters)."),
  temperatureThreshold: z.coerce.number().min(-50).max(100, "Temperature threshold seems incorrect."),
});

type RiskPredictionFormValues = z.infer<typeof riskPredictionSchema>;

export function RiskPredictionForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [predictionResult, setPredictionResult] = React.useState<PredictRiskyBatchesOutput | null>(null);

  const form = useForm<RiskPredictionFormValues>({
    resolver: zodResolver(riskPredictionSchema),
    defaultValues: {
      batchData: "Example: Batch BATCH001 - Route: Berlin to Munich. Avg External Temp: 15°C. Vehicle: Refrigerated Van XYZ. Past incidents on this route: 1 minor delay in winter. Current cargo: Vaccines, requires 2-8°C. GPS logs: ... Temperature logs: ...",
      temperatureThreshold: 8,
    },
  });

  async function onSubmit(values: RiskPredictionFormValues) {
    setIsLoading(true);
    setPredictionResult(null);

    try {
      const input: PredictRiskyBatchesInput = {
        batchData: values.batchData,
        temperatureThreshold: values.temperatureThreshold,
      };
      const result = await predictRiskyBatches(input);
      setPredictionResult(result);
      toast({
        title: "Risk Prediction Complete",
        description: result.isRisky ? "Potential risks identified." : "No significant risks predicted.",
      });
    } catch (error) {
      console.error("AI Risk Prediction Error:", error);
      toast({
        variant: "destructive",
        title: "Prediction Failed",
        description: "An error occurred while predicting risks. Please check the console for details.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card className="w-full shadow-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-headline">
                <BrainCircuit className="h-7 w-7 text-primary" />
                AI-Powered Risk Prediction
              </CardTitle>
              <CardDescription>
                Analyze historical batch data to predict potential temperature breaches and identify risk factors.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="batchData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Historical Batch Data</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste historical data: temperature logs, GPS, timestamps, route characteristics, etc."
                        className="min-h-[150px]"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide comprehensive data for accurate predictions. Include details about route, weather, vehicle, and previous incidents if any.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="temperatureThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temperature Threshold (°C)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 8" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormDescription>The temperature above which the batch is considered at risk.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                {isLoading ? "Analyzing..." : "Predict Risks"}
                {!isLoading && <Sparkles className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {isLoading && !predictionResult && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="font-headline">Prediction in Progress...</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-full" />
          </CardContent>
        </Card>
      )}

      {predictionResult && (
        <Card className={`shadow-xl ${predictionResult.isRisky ? "border-accent bg-accent/5" : "border-green-500 bg-green-500/5"}`}>
          <CardHeader>
            <CardTitle className={`font-headline flex items-center gap-2 ${predictionResult.isRisky ? "text-accent" : "text-green-600 dark:text-green-400"}`}>
              {predictionResult.isRisky ? <AlertTriangle className="h-7 w-7" /> : <CheckCircle className="h-7 w-7" />}
              Prediction Result: {predictionResult.isRisky ? "Risky Batch" : "Low Risk"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold">Risk Factors:</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{predictionResult.riskFactors || "None identified."}</p>
            </div>
            <div>
              <h4 className="font-semibold flex items-center gap-1"><Lightbulb className="h-4 w-4"/>Suggested Actions:</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{predictionResult.suggestedActions || "Standard monitoring procedures are sufficient."}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
