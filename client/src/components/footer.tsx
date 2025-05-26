import { Link } from "wouter";
import { Utensils, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Utensils className="text-white h-5 w-5" />
              </div>
              <div>
                <h3 className="font-dancing text-xl font-bold">Family Kebab House</h3>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Norwich's premier kebab shop serving authentic flavors for over 20 years. 
              Fresh ingredients, traditional recipes, exceptional service.
            </p>
          </div>

          <div>
            <h4 className="font-poppins font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/menu" className="text-gray-300 hover:text-white transition-colors">Menu</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-bold mb-4">Popular Items</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Doner Kebab</li>
              <li>Chicken Kebab</li>
              <li>Fresh Pizzas</li>
              <li>Family Deals</li>
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-bold mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Phone className="text-primary mr-3 h-4 w-4" />
                <span>01692 584100</span>
              </div>
              <div className="flex items-start">
                <MapPin className="text-primary mr-3 h-4 w-4 mt-1" />
                <span>79 High Street<br />Stalham, Norwich NR12 9BB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Family Kebab House. All rights reserved. | 
            <span className="text-primary"> Norwich's Premier Kebab Shop</span> | 
            Serving authentic flavors since 2004
          </p>
        </div>
      </div>
    </footer>
  );
}
