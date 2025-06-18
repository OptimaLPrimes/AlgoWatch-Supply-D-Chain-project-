
"use client";
import * as React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, Filter, Edit3, Trash2, Eye, MoreHorizontal } from "lucide-react";
import { useBatchManager } from "@/hooks/use-batch-manager"; // Import the hook
import type { Batch } from "@/types";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function BatchManagementPage() {
  const { batches, deleteBatch } = useBatchManager(); // Use the hook
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredBatches = React.useMemo(() => 
    batches.filter(batch =>
      batch.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.status.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a,b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()), // Sort by newest first
    [batches, searchTerm]
  );

  const handleDeleteBatch = (batchId: string) => {
    if (confirm(`Are you sure you want to delete batch ${batchId}? This action cannot be undone.`)) {
      deleteBatch(batchId);
    }
  };

  return (
    <div className="container mx-auto py-2">
      <PageHeader title="Batch Management" description="Oversee and manage all supply chain batches.">
        <Button asChild>
          <Link href="/batches/register">
            <PlusCircle /> Register New Batch
          </Link>
        </Button>
      </PageHeader>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline">All Batches</CardTitle>
          <CardDescription>
            View, search, and manage batch information. Click on a Batch ID to see details.
          </CardDescription>
          <div className="flex flex-col sm:flex-row items-center gap-2 pt-4">
            <div className="relative w-full sm:w-auto flex-grow">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search batches (ID, Product, Status)..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter /> Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredBatches.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch ID</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Origin</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBatches.map((batch) => (
                    <TableRow key={batch.id}>
                      <TableCell className="font-medium">
                        <Link href={`/verify-batch?id=${batch.id}`} className="text-primary hover:underline">
                          {batch.id}
                        </Link>
                      </TableCell>
                      <TableCell>{batch.productName}</TableCell>
                      <TableCell>{batch.origin}</TableCell>
                      <TableCell>{batch.destination}</TableCell>
                      <TableCell>
                        <Badge variant={batch.status === 'Issue' ? 'destructive' : batch.status === 'Delivered' ? 'default' : 'secondary'}>
                          {batch.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(batch.creationDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                               <Link href={`/verify-batch?id=${batch.id}`} className="w-full flex items-center gap-2"> {/* Added flex items-center gap-2 for Link content */}
                                <Eye /> View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert(`Editing for ${batch.id} is not yet implemented.`)}>
                              <Edit3 /> Edit Batch
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert(`Updating checkpoint for ${batch.id} is not yet implemented.`)}>
                              <PlusCircle /> Update Checkpoint
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive focus:bg-destructive/10" 
                              onClick={() => handleDeleteBatch(batch.id)}
                            >
                              <Trash2 /> Delete Batch
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No batches found matching your criteria.</p>
              {batches.length === 0 && searchTerm === "" && (
                 <p className="text-sm mt-2">Try <Link href="/batches/register" className="text-primary hover:underline">registering a new batch</Link> to get started.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
