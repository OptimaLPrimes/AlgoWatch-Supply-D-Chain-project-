
import { BatchRegistrationForm } from "@/components/batches/batch-registration-form";
import { PageHeader } from "@/components/shared/page-header";

export default function RegisterBatchPage() {
  return (
    <div className="container mx-auto py-2">
       <PageHeader 
        title="Register New Batch" 
        description="Fill in the details below to add a new batch to the supply chain."
      />
      <BatchRegistrationForm />
    </div>
  );
}
