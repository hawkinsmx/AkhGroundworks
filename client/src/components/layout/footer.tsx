import { Link } from "wouter";
import { Linkedin, Facebook } from "lucide-react";
import { SiIndeed } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-muted mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">AKH Groundworks LTD</h3>
            <p className="text-muted-foreground">
              Professional groundworks and civil engineering solutions for all your construction needs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Services
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/portfolio">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Portfolio
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <address className="text-muted-foreground not-italic">
              <p>Email: info@akhgroundworks.co.uk</p>
              <p>Phone: 07904 952238</p>
              <p>Address: 6 Court Road,<br />Bournemouth, BH9 3DL</p>
            </address>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Indeed"
              >
                <SiIndeed className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AKH Groundworks LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}