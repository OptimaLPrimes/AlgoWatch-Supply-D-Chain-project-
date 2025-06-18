
"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface QrCodeDisplayProps {
  qrCodeUrl: string;
  batchId: string;
}

export function QrCodeDisplay({ qrCodeUrl, batchId }: QrCodeDisplayProps) {
  const handleDownload = () => {
    // In a real app, this would trigger a download of the actual QR code image
    // For placeholder, we can simulate or link to the placeholder URL
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `QR_${batchId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg bg-muted/50">
      <Image
        src={qrCodeUrl}
        alt={`QR Code for Batch ${batchId}`}
        width={200}
        height={200}
        className="rounded-md shadow-md"
        data-ai-hint="qr code"
      />
      <p className="mt-2 text-sm text-muted-foreground">Batch ID: {batchId}</p>
      <Button onClick={handleDownload} variant="outline" size="sm" className="mt-3">
        <Download />
        Download QR Code
      </Button>
    </div>
  );
}
