
import { Package } from 'lucide-react';
import Link from 'next/link';

export function AppFooter() {
  return (
    <footer className="mt-auto border-t bg-background/95 py-6 text-center text-sm text-muted-foreground backdrop-blur-sm">
      <div className="container mx-auto flex flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} ChainWatch. All rights reserved.</p>
        <Link href="/dashboard" className="flex items-center gap-2 hover:text-primary transition-colors">
          <Package className="h-5 w-5" />
          <span className="font-headline">ChainWatch</span>
        </Link>
      </div>
    </footer>
  );
}
