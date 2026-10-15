import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  Phone,
  Utensils,
  CreditCard,
} from "lucide-react";

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location.pathname === "/") {
      return true;
    }

    if (href !== "/" && location.pathname.startsWith(href)) {
      return true;
    }

    return false;
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="bg-charcoal text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-2 text-center text-xs sm:text-sm">
            <CreditCard className="text-accent h-4 w-4 flex-shrink-0" />

            <span>
              Cash and card payments accepted in store
            </span>

            <span className="hidden sm:inline text-gray-400">|</span>

            <span>
              Dine-in and takeaway collection only. No delivery service.
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Utensils className="text-white h-6 w-6" />
            </div>

            <div>
              <h1 className="font-dancing text-2xl font-bold text-charcoal">
                Family Kebab House
              </h1>

              <p className="text-sm text-gray-600">
                Kebab &amp; Pizza
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-colors font-medium ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-charcoal hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <a href="tel:01692584100" className="hidden sm:block">
              <Button className="bg-accent text-white hover:bg-orange-600 transition-colors">
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Button>
            </a>

            <Sheet
              open={mobileMenuOpen}
              onOpenChange={setMobileMenuOpen}
            >
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block py-3 text-lg font-medium transition-colors border-b border-gray-100 ${
                        isActive(item.href)
                          ? "text-primary"
                          : "text-charcoal hover:text-primary"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}

                  <div className="mt-4 rounded-lg bg-gray-50 p-4">
                    <div className="flex items-start">
                      <CreditCard className="text-primary mr-3 h-5 w-5 mt-0.5 flex-shrink-0" />

                      <div>
                        <p className="font-semibold text-charcoal text-sm">
                          Payment and collection
                        </p>

                        <p className="text-gray-600 text-sm mt-1">
                          Cash and card payments accepted in store.
                        </p>

                        <p className="text-gray-600 text-sm mt-1">
                          Dine-in and takeaway collection only. No delivery
                          service.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <a href="tel:01692584100">
                      <Button className="w-full bg-primary text-white hover:bg-red-700">
                        <Phone className="mr-2 h-4 w-4" />
                        Call 01692 584100
                      </Button>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
