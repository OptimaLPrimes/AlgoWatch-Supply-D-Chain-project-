
"use client";
import * as React from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { BatchVerificationForm } from "@/components/verify-batch/batch-verification-form";
import { BatchDetails } from "@/components/verify-batch/batch-details";
import { useBatchManager } from "@/hooks/use-batch-manager"; // Import the hook
import type { Batch } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SearchX, Loader2 } from "lucide-react";

export default function VerifyBatchPage() {
  const searchParams = useSearchParams();
  const initialBatchIdFromQuery = searchParams.get("id");
  const { getBatchById } = useBatchManager(); // Use the hook

  const [verifiedBatch, setVerifiedBatch] = React.useState<Batch | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [searchedBatchId, setSearchedBatchId] = React.useState<string | null>(initialBatchIdFromQuery);

  const handleVerify = React.useCallback(async (batchId: string) => {
    setIsLoading(true);
    setError(null);
    setVerifiedBatch(null);
    setSearchedBatchId(batchId);

    // Simulate API call delay if needed, but fetching from hook is fast
    await new Promise(resolve => setTimeout(resolve, 500)); // Shorter delay
    
    const batchData = getBatchById(batchId);

    if (batchData) {
      setVerifiedBatch(batchData);
    } else {
      setError(`Batch with ID "${batchId}" not found in local records.`);
    }
    setIsLoading(false);
  }, [getBatchById]); // Add getBatchById to dependencies
  
  React.useEffect(() => {
    if (initialBatchIdFromQuery) {
      handleVerify(initialBatchIdFromQuery);
    }
  }, [initialBatchIdFromQuery, handleVerify]);

  return (
    <div className="container mx-auto py-2">
      <PageHeader
        title="Verify Batch"
        description="Enter a Batch ID to view its provenance and current status from local records."
      />

      <div className="mb-8 flex justify-center">
        <BatchVerificationForm 
          onVerify={handleVerify} 
          initialBatchId={initialBatchIdFromQuery || undefined}
          isLoading={isLoading}
        />
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center text-center py-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium">Verifying Batch {searchedBatchId}...</p>
          <p className="text-muted-foreground">Fetching details from local records.</p>
        </div>
      )}

      {error && !isLoading && (
        <Alert variant="destructive" className="max-w-lg mx-auto">
          <SearchX className="h-5 w-5" />
          <AlertTitle>Verification Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!isLoading && verifiedBatch && (
        <BatchDetails batch={verifiedBatch} />
      )}
      
      {!isLoading && !verifiedBatch && !error && searchedBatchId && (
         <div className="text-center py-10">
          <p className="text-muted-foreground">No details to display for Batch ID: {searchedBatchId}.</p>
        </div>
      )}

      {!isLoading && !verifiedBatch && !error && !searchedBatchId && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Enter a Batch ID above to see its details.</p>
        </div>
      )}
    </div>
  );
}
