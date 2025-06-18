
"use client";

import * as React from "react";
import type { Batch, FileAttachment } from "@/types";
import { mockBatches as initialMockBatches } from "@/data/mock-data";

const LOCAL_STORAGE_KEY = "chainwatch_batches";

// Helper to get batches from localStorage
const getStoredBatches = (): Batch[] => {
  if (typeof window === "undefined") return initialMockBatches; 
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Batch[];
    }
    // Initialize localStorage with mock data if it's empty
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialMockBatches));
    return initialMockBatches;
  } catch (error) {
    console.error("Error accessing localStorage for batches:", error);
    return initialMockBatches; // Fallback to mock data on error
  }
};

// Helper to save batches to localStorage
const storeBatches = (batches: Batch[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(batches));
    } catch (error) {
      console.error("Error saving batches to localStorage:", error);
    }
  }
};

// Define the shape of the form data expected by addBatch
interface BatchRegistrationFormValues {
  batchId?: string;
  productName: string;
  origin: string;
  destination: string;
  initialGps: string;
  temperatureLimit: number;
  attachments?: FileList | FileAttachment[]; // Form might pass FileList, or pre-processed attachments
}


export function useBatchManager() {
  // Initialize state synchronously from localStorage
  const [batches, setBatchesState] = React.useState<Batch[]>(() => getStoredBatches());

  // Removed useEffect for initial loading as it's now handled by useState initializer

  const addBatch = React.useCallback((formData: BatchRegistrationFormValues) => {
    const newBatchId = formData.batchId || `BATCH${Date.now().toString().slice(-6)}`;
    
    const processedAttachments: FileAttachment[] = [];
    if (formData.attachments) {
      if (formData.attachments instanceof FileList) {
        for (let i = 0; i < formData.attachments.length; i++) {
          const file = formData.attachments[i];
          processedAttachments.push({
            name: file.name,
            url: URL.createObjectURL(file), // Create a temporary local URL for display
            type: file.type.startsWith("image/") ? "image" : "other",
          });
        }
      } else {
        // This case handles if attachments are already in FileAttachment[] format, though unlikely from the form
         processedAttachments.push(...(formData.attachments as FileAttachment[]));
      }
    }


    const newBatch: Batch = {
      id: newBatchId,
      productName: formData.productName,
      origin: formData.origin,
      destination: formData.destination,
      temperatureLimitCelsius: formData.temperatureLimit,
      creationDate: new Date().toISOString(),
      status: "Registered",
      currentLocationGps: formData.initialGps,
      qrCodeUrl: `https://placehold.co/150x150.png/E0E0E0/B0B0B0?text=QR+${newBatchId.substring(0,10)}`,
      attachments: processedAttachments,
      checkpoints: [
        {
          id: `CP${Date.now().toString().slice(-7)}`,
          locationName: formData.origin,
          gpsCoordinates: formData.initialGps,
          timestamp: new Date().toISOString(),
          temperatureCelsius: undefined, 
          handlerRole: "Manufacturer",
          notes: "Batch Registered"
        }
      ],
      temperatureLogs: [],
    };

    setBatchesState(prevBatches => {
      const updatedBatches = [...prevBatches, newBatch];
      storeBatches(updatedBatches);
      return updatedBatches;
    });
    return newBatch;
  }, []);

  const getBatches = React.useCallback((): Batch[] => {
    return batches;
  }, [batches]);

  const getBatchById = React.useCallback((id: string): Batch | undefined => {
    return batches.find(b => b.id === id);
  }, [batches]);

  const deleteBatch = React.useCallback((batchId: string) => {
    setBatchesState(prevBatches => {
      const updatedBatches = prevBatches.filter(b => b.id !== batchId);
      // Revoke Object URLs for attachments of the deleted batch to prevent memory leaks
      const batchToDelete = prevBatches.find(b => b.id === batchId);
      if (batchToDelete?.attachments) {
        batchToDelete.attachments.forEach(att => {
          if (att.url.startsWith('blob:')) {
            URL.revokeObjectURL(att.url);
          }
        });
      }
      storeBatches(updatedBatches);
      return updatedBatches;
    });
  }, []);
  
  const updateBatch = React.useCallback((updatedBatch: Batch) => {
    setBatchesState(prevBatches => {
      const batchIndex = prevBatches.findIndex(b => b.id === updatedBatch.id);
      if (batchIndex === -1) return prevBatches;

      const newBatches = [...prevBatches];
      newBatches[batchIndex] = updatedBatch;
      storeBatches(newBatches);
      return newBatches;
    });
  }, []);

  // Cleanup object URLs on unmount or when batches change significantly (though less critical here)
  React.useEffect(() => {
    return () => {
      batches.forEach(batch => {
        if (batch.attachments) {
          batch.attachments.forEach(att => {
            if (att.url.startsWith('blob:')) {
              URL.revokeObjectURL(att.url);
            }
          });
        }
      });
    };
  }, [batches]);


  return { addBatch, getBatches, getBatchById, deleteBatch, updateBatch, batches };
}
