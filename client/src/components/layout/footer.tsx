import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-muted mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
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
            <address className="text-muted-foreground not-italic space-y-2">
              <p>Email: info@akhgroundworks.co.uk</p>
              <p>Phone: 07904 952238</p>
            </address>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AKH Groundworks LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}