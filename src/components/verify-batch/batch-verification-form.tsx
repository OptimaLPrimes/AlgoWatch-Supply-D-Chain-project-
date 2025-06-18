
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { QrCode, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const verificationSchema = z.object({
  batchId: z.string().min(1, "Batch ID is required"),
});

type VerificationFormValues = z.infer<typeof verificationSchema>;

interface BatchVerificationFormProps {
  onVerify: (batchId: string) => void;
  initialBatchId?: string;
  isLoading: boolean;
}

export function BatchVerificationForm({ onVerify, initialBatchId, isLoading }: BatchVerificationFormProps) {
  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      batchId: initialBatchId || "",
    },
  });
  
  React.useEffect(() => {
    if (initialBatchId) {
      form.setValue("batchId", initialBatchId);
      // Optionally auto-submit if initialBatchId is present
      // onVerify(initialBatchId); 
    }
  }, [initialBatchId, form, onVerify]);


  function onSubmit(values: VerificationFormValues) {
    onVerify(values.batchId);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row items-start gap-4 w-full max-w-lg">
        <FormField
          control={form.control}
          name="batchId"
          render={({ field }) => (
            <FormItem className="flex-grow w-full">
              <FormLabel className="sr-only">Batch ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Batch ID or Scan QR Code"
                  {...field}
                  className="h-12 text-base"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 w-full sm:w-auto">
          <Button type="submit" size="lg" className="flex-grow sm:flex-grow-0" disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify Batch'}
            {!isLoading && <Search />}
          </Button>
          <Button type="button" variant="outline" size="lg" className="flex-grow sm:flex-grow-0" disabled={isLoading} onClick={() => alert("QR Scanner not implemented yet.")}>
            <QrCode />
            Scan QR
          </Button>
        </div>
      </form>
    </Form>
  );
}
