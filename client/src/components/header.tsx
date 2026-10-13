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
      {/* Payment Information Bar */}
      <div className="bg-charcoal text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-2 text-xs sm:text-sm">
            <CreditCard className="text-accent mr-2 h-4 w-4 flex-shrink-0" />
            <span>
              Cash and card payments accepted in store
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
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

          {/* Desktop Navigation */}
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

          {/* Call Button and Mobile Menu */}
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
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Mobile Navigation */}
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block py-3 text-lg font-medium transition-colors border-b border-gray-100 ${
                        isActive(item.href)
                          ? "text-primary"
                          : "text-charcoal hover:text-primary"
                      }`}
                      onClick={() => setMobileMenuOpen              {item.name}
                    </Link>
                  ))}

                  {/* Payment Information */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start">
                      <CreditCard className="text-primary mr-3 h-5 w-5 mt-0.5 flex-shrink-0" />

                      <div>
                        <p className="font-semibold text-charcoal text-sm">
                          Payment Methods
                        </p>

                        <p className="text-gray-600 text-sm mt-1">
                          Cash and card payments accepted in store.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Call Button */}
                  <div className="mt-4">
                    tel:01692584100
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
