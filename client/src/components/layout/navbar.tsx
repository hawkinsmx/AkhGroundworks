import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { COMPANY_LOGO } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Small Works", href: "/small-works" },
  { label: "Gallery", href: "/gallery" },
  { label: "Apply", href: "/apply" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="fixed w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/">
            <a className="flex items-center space-x-2">
              <img 
                src={COMPANY_LOGO} 
                alt="AKH Groundworks Logo" 
                className="h-12 w-auto"
              />
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location === item.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <motion.div 
                className="py-4 space-y-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                  >
                    <Link href={item.href}>
                      <a
                        className={cn(
                          "block py-2 text-sm font-medium transition-colors hover:text-primary",
                          location === item.href
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </a>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}