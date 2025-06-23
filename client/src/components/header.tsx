import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, Utensils, Zap } from "lucide-react";

interface HeaderProps {
  onAIRecommendationsClick?: () => void;
}

export default function Header({ onAIRecommendationsClick }: HeaderProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/logo.jpg" 
              alt="Family Kebab House Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h1 className="font-dancing text-2xl font-bold text-charcoal">Family Kebab</h1>
              <p className="text-sm text-gray-600">Kebab & Pizza</p>
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

          <div className="flex items-center space-x-2">
            {/* AI Recommendations Button */}
            <Button
              onClick={onAIRecommendationsClick}
              className="hidden lg:flex bg-gradient-to-r from-primary to-accent hover:from-red-700 hover:to-orange-600 text-white font-semibold animate-pulse hover:animate-none transition-all duration-300"
            >
              <Zap className="mr-2 h-4 w-4" />
              🤖 AI Picks
            </Button>

            <a href="tel:01692584100">
              <Button className="bg-accent-gold text-charcoal hover:bg-yellow-600 transition-colors font-semibold">
                <Phone className="mr-2 h-4 w-4" />
                01692 584 100
              </Button>
            </a>
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
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
                  <div className="mt-8 space-y-3">
                    {/* AI Recommendations for Mobile */}
                    <Button
                      onClick={() => {
                        onAIRecommendationsClick?.();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-primary to-accent text-white hover:from-red-700 hover:to-orange-600"
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      🤖 AI Recommendations
                    </Button>
                    
                    <a href="tel:01692584100">
                      <Button className="w-full bg-primary text-white hover:bg-red-700">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now
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
      </AccessibleLandmark>
    </>
  );
}
