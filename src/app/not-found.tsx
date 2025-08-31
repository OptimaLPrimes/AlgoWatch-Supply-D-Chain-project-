import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Package, AlertTriangle, LogIn, LayoutDashboard, Home, RefreshCcw, Search } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <main
      role="alert"
      aria-live="assertive"
      className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center"
    >
      {/* Icon */}
      <div className="mb-8">
        <AlertTriangle className="mx-auto h-24 w-24 text-destructive animate-pulse" />
      </div>

      {/* Headings */}
      <h1 className="mb-4 text-6xl font-bold font-headline text-primary">404</h1>
      <h2 className="mb-3 text-3xl font-semibold font-headline">Page Not Found</h2>

      {/* Helpful message */}
      <p className="mb-6 max-w-md text-lg text-muted-foreground">
        Oops! The page you&apos;re looking for doesn&apos;t exist, was moved, 
        or you may not have permission to view it.
      </p>

      {/* Suggested next actions */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/">
          <Button size="lg">
            <Home className="mr-2 h-5 w-5" /> Go Home
          </Button>
        </Link>

        <Link href="/login">
          <Button size="lg" variant="secondary">
            <LogIn className="mr-2 h-5 w-5" /> Login
          </Button>
        </Link>

        <Link href="/dashboard">
          <Button size="lg" variant="outline">
            <LayoutDashboard className="mr-2 h-5 w-5" /> Dashboard
          </Button>
        </Link>

        <Button
          size="lg"
          variant="ghost"
          onClick={() => router.refresh()}
        >
          <RefreshCcw className="mr-2 h-5 w-5" /> Retry
        </Button>
      </div>

      {/* Search option */}
      <div className="mt-8 flex w-full max-w-md items-center border rounded-xl overflow-hidden shadow-sm">
        <input
          type="text"
          placeholder="Search for a page..."
          className="flex-1 px-4 py-2 outline-none bg-transparent text-foreground"
        />
        <Button className="rounded-none">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Support/help text */}
      <p className="mt-8 text-sm text-muted-foreground">
        Still stuck? <Link href="/support" className="underline">Contact support</Link>.
      </p>

      {/* Branding footer */}
      <div className="mt-6 flex items-center gap-2 text-muted-foreground">
        <Package className="h-6 w-6" />
        <span className="font-headline text-lg">ChainWatch</span>
      </div>
    </main>
  );
}
