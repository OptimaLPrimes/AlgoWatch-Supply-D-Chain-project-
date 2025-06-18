
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Package, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
      <div className="mb-8">
        <AlertTriangle className="mx-auto h-24 w-24 text-accent animate-pulse" />
      </div>
      <h1 className="mb-4 text-6xl font-bold font-headline text-primary">404</h1>
      <h2 className="mb-3 text-3xl font-semibold font-headline">Page Not Found</h2>
      <p className="mb-8 max-w-md text-lg text-muted-foreground">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <div className="flex items-center space-x-4">
         <Link href="/" passHref legacyBehavior>
          <Button size="lg">
            <Package className="mr-2 h-5 w-5" />
            Go to Login
          </Button>
        </Link>
        <Link href="/dashboard" passHref legacyBehavior>
          <Button variant="outline" size="lg">
            Go to Dashboard
          </Button>
        </Link>
      </div>
      <p className="mt-12 text-sm text-muted-foreground">
        If you believe this is an error, please contact support.
      </p>
       <div className="mt-4 flex items-center gap-2 text-muted-foreground">
          <Package className="h-6 w-6" />
          <span className="font-headline text-lg">ChainWatch</span>
        </div>
    </div>
  );
}
