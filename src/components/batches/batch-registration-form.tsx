
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
import { Textarea } from "@/components/ui/textarea"; // Although not used, keep for consistency if added later
import { useToast } from "@/hooks/use-toast";
import { QrCodeDisplay } from "./qr-code-display";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useBatchManager } from "@/hooks/use-batch-manager";
import type { Batch } from "@/types";

const batchRegistrationSchema = z.object({
  batchId: z.string().min(3, "Batch ID must be at least 3 characters").optional().or(z.literal('')), // Optional for auto-generation
  productName: z.string().min(3, "Product name is required"),
  origin: z.string().min(3, "Origin location is required"),
  destination: z.string().min(3, "Destination location is required"),
  initialGps: z.string().regex(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/, "Invalid GPS format (e.g., 40.7128, -74.0060)"),
  temperatureLimit: z.coerce.number().min(-100).max(100, "Temperature limit seems incorrect"),
  attachments: z.instanceof(FileList).optional(), // For file input
});

type BatchRegistrationFormValues = z.infer<typeof batchRegistrationSchema>;

export function BatchRegistrationForm() {
  const { toast } = useToast();
  const batchManager = useBatchManager();
  const [isLoading, setIsLoading] = React.useState(false);
  const [registeredBatch, setRegisteredBatch] = React.useState<Batch | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);


  const form = useForm<BatchRegistrationFormValues>({
    resolver: zodResolver(batchRegistrationSchema),
    defaultValues: {
      batchId: `BATCH${Date.now().toString().slice(-6)}`,
      productName: "",
      origin: "",
      destination: "",
      initialGps: "",
      temperatureLimit: 5,
      attachments: undefined,
    },
  });

  async function onSubmit(values: BatchRegistrationFormValues) {
    setIsLoading(true);
    setRegisteredBatch(null); 

    try {
      // The attachments field from form values will be a FileList
      const newBatch = await batchManager.addBatch({
        ...values,
        batchId: values.batchId || `BATCH${Date.now().toString().slice(-6)}`, // Ensure batchId is a string
        attachments: values.attachments, // Pass the FileList
      });
      setRegisteredBatch(newBatch);

      toast({
        title: "Batch Registered Successfully!",
        description: `Batch ${newBatch.id} for ${newBatch.productName} has been created.`,
      });
      
      form.reset({ // Reset form with a new suggested Batch ID
        batchId: `BATCH${Date.now().toString().slice(-6)}`,
        productName: "",
        origin: "",
        destination: "",
        initialGps: "",
        temperatureLimit: 5,
        attachments: undefined,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear file input
      }

    } catch (error) {
      console.error("Error registering batch:", error);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: "An error occurred while registering the batch.",
      });
    } finally {
      setIsLoading(false);
    }
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
                    <FormLabel>Batch ID (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Auto-generates if empty" {...field} value={field.value ?? ''} disabled={isLoading} />
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
              render={({ field: { onChange, value, ...restField } }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><Upload className="h-4 w-4" />Attach Files (Optional)</FormLabel>
                  <FormControl>
                     <Input 
                        type="file" 
                        multiple 
                        disabled={isLoading}
                        onChange={(e) => onChange(e.target.files)}
                        ref={fileInputRef}
                        {...restField}
                      />
                  </FormControl>
                  <FormDescription>Upload bills, invoices, or product images.</FormDescription>
                  <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                    <FileText className="h-3 w-3"/> Bill/Invoice <ImageIcon className="h-3 w-3 ml-2"/> Image
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {registeredBatch && registeredBatch.qrCodeUrl && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Generated QR Code for {registeredBatch.id}</h3>
                <QrCodeDisplay qrCodeUrl={registeredBatch.qrCodeUrl} batchId={registeredBatch.id} />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register Batch & Generate QR"}
              {!isLoading && <PackagePlus />}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
