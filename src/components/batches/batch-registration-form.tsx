
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PackagePlus, Upload, FileText, Image as ImageIcon, Thermometer, MapPin } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { QrCodeDisplay } from "./qr-code-display";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const batchRegistrationSchema = z.object({
  batchId: z.string().min(3, "Batch ID must be at least 3 characters"),
  productName: z.string().min(3, "Product name is required"),
  origin: z.string().min(3, "Origin location is required"),
  destination: z.string().min(3, "Destination location is required"),
  initialGps: z.string().regex(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/, "Invalid GPS format (e.g., 40.7128, -74.0060)"),
  temperatureLimit: z.coerce.number().min(-100).max(100, "Temperature limit seems incorrect"),
  attachments: z.any().optional(), // Placeholder for file uploads
});

type BatchRegistrationFormValues = z.infer<typeof batchRegistrationSchema>;

export function BatchRegistrationForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [generatedQrCode, setGeneratedQrCode] = React.useState<string | null>(null);

  const form = useForm<BatchRegistrationFormValues>({
    resolver: zodResolver(batchRegistrationSchema),
    defaultValues: {
      batchId: `BATCH${Date.now().toString().slice(-6)}`,
      productName: "",
      origin: "",
      destination: "",
      initialGps: "",
      temperatureLimit: 5,
    },
  });

  async function onSubmit(values: BatchRegistrationFormValues) {
    setIsLoading(true);
    // Simulate API call and smart contract interaction
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Registering batch:", values);
    // In a real app, call backend API which triggers smart contract
    // Then, generate QR code based on batchId or response

    setGeneratedQrCode(`https://placehold.co/200x200.png?text=QR+${values.batchId}`);

    toast({
      title: "Batch Registered Successfully!",
      description: `Batch ${values.batchId} for ${values.productName} has been created.`,
    });
    
    // Optionally reset form or redirect
    // form.reset(); 
    setIsLoading(false);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-headline">
              <PackagePlus className="h-7 w-7 text-primary" />
              Register New Batch
            </CardTitle>
            <CardDescription>
              Enter the details for the new batch to track its journey on the blockchain.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="batchId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batch ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., BATCHXYZ123" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., PharmaX Vaccine Vials" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><MapPin className="h-4 w-4" />Origin</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Manufacturer Plant A, Berlin" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><MapPin className="h-4 w-4" />Destination</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Central Pharmacy, Munich" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="initialGps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial GPS Coordinates</FormLabel>
                    <FormControl>
                      <Input placeholder="lat,lng (e.g., 52.5200, 13.4050)" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormDescription>Current GPS location of the batch origin.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="temperatureLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1"><Thermometer className="h-4 w-4" />Temperature Limit (°C)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 5" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormDescription>Maximum allowed temperature.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="attachments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><Upload className="h-4 w-4" />Attach Files (Optional)</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} disabled={isLoading} multiple />
                  </FormControl>
                  <FormDescription>Upload bills, invoices, or product images.</FormDescription>
                  <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                    <FileText className="h-3 w-3"/> Bill/Invoice <ImageIcon className="h-3 w-3 ml-2"/> Image
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {generatedQrCode && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Generated QR Code</h3>
                <QrCodeDisplay qrCodeUrl={generatedQrCode} batchId={form.getValues("batchId")} />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register Batch & Generate QR"}
              {!isLoading && <PackagePlus className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
