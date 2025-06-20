
import { Package, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function AppFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-white">
              <Package className="h-7 w-7 text-primary" />
              <span className="font-headline text-2xl font-semibold">ChainWatch</span>
            </Link>
            <p className="text-sm">
              Enhancing supply chain transparency and security with cutting-edge technology.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Innovation Drive, Tech City, 10101</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@chainwatch.com</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:justify-self-center">
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          {/* Social Media & Newsletter */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div>
                  <h3 className="font-semibold text-white mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <Link href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-primary transition-colors">
                      <Linkedin className="h-6 w-6" />
                    </Link>
                    <Link href="#" aria-label="Twitter" className="text-gray-400 hover:text-primary transition-colors">
                      <Twitter className="h-6 w-6" />
                    </Link>
                    <Link href="#" aria-label="Facebook" className="text-gray-400 hover:text-primary transition-colors">
                      <Facebook className="h-6 w-6" />
                    </Link>
                    <Link href="#" aria-label="Instagram" className="text-gray-400 hover:text-primary transition-colors">
                      <Instagram className="h-6 w-6" />
                    </Link>
                  </div>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-4">Subscribe to our Newsletter</h3>
                <p className="text-sm mb-3">Get the latest updates and news from ChainWatch.</p>
                <form className="flex flex-col sm:flex-row gap-2">
                  <Input 
                    type="email" 
                    placeholder="Your email address" 
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-primary"
                  />
                  <Button type="submit" variant="default">Subscribe</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4">
        <div className="container mx-auto text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} ChainWatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
