import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Phone, MapPin, Clock, Star, Heart, Check } from "lucide-react";

export default function Home() {
  const specialOffers = [
    {
      id: "pizza-offer-1",
      name: "Pizza Offer 1",
      description: "12\" Pizza from set menu",
      price: 17.20,
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "pizza-offer-2", 
      name: "Pizza Offer 2",
      description: "12\" Pizza from set menu",
      price: 22.50,
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "family-deal",
      name: "Family Deal", 
      description: "10\" Pizza + 3 toppings + 6pcs Chicken + Nuggets + 2 chips + Bottle of soft drink",
      price: 26.90,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "linear-gradient(rgba(46, 46, 46, 0.7), rgba(46, 46, 46, 0.7)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"
          }}
        />
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="mb-6">
              <Badge className="bg-secondary text-white px-4 py-2 text-sm font-semibold">
                <Star className="mr-2 h-4 w-4" />
                Serving Norwich for 20+ Years
              </Badge>
            </div>
            
            <h1 className="font-poppins text-5xl md:text-7xl font-bold mb-6">
              Authentic <span className="text-accent">Kebabs</span> &nbsp;
              <span className="text-primary">Fresh Pizzas</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              Norwich's premier kebab shop offering mouth-watering doner kebabs, crispy pizzas, and more.{" "}
              <strong>Open now</strong> for dine-in and takeaway!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a href="tel:01692584100">
                <Button size="lg" className="bg-primary text-white hover:bg-red-700 transform hover:scale-105 transition-all">
                  <Phone className="mr-3 h-5 w-5" />
                  Order Now: 01692 584100
                </Button>
              </a>
              <Link href="/menu">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-charcoal">
                  <span className="mr-3">📋</span>{" "}
                  View Menu
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm">
              <div className="flex items-center">
                <MapPin className="text-accent mr-2 h-4 w-4" />
                <span>79 High Street, Stalham, Norwich NR12 9BB</span>
              </div>
              <div className="flex items-center">
                <Clock className="text-accent mr-2 h-4 w-4" />
                <span>Lunch Offers: 12:00 - 14:30</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-gradient-to-r from-primary to-red-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-4xl font-bold text-white mb-4">Special Meal Deals</h2>
            <p className="text-red-100 text-lg">Unbeatable value for money - Perfect for families!</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {specialOffers.map((offer) => (
              <Card key={offer.id} className="overflow-hidden transform hover:scale-105 transition-transform">
                <img 
                  src={offer.image} 
                  alt={offer.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-poppins text-xl font-bold text-charcoal mb-2">{offer.name}</h3>
                  <p className="text-gray-600 mb-4">{offer.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary">£{offer.price.toFixed(2)}</span>
                    <a href="tel:01692584100">
                      <Button className="bg-accent text-white hover:bg-orange-600">
                        Order Now
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-poppins text-5xl font-bold text-charcoal mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  For over <strong className="text-primary">20 years</strong>, Family Kebab House has been serving the finest authentic kebabs and fresh pizzas to the wonderful community of Stalham and Norwich.
                </p>
                <p>
                  We pride ourselves on using only the <strong className="text-secondary">freshest ingredients</strong>, traditional cooking methods, and providing exceptional customer service that keeps our community coming back for more.
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">20+</div>
                  <div className="text-gray-600">Years Serving</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">100%</div>
                  <div className="text-gray-600">Fresh Daily</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">★★★★★</div>
                  <div className="text-gray-600">Local Favorite</div>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/about">
                  <Button className="bg-secondary text-white hover:bg-green-700">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="space-y-6">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Family restaurant kitchen with fresh food preparation" 
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-poppins text-xl font-bold text-charcoal mb-4 flex items-center">
                    <Heart className="text-primary mr-3 h-5 w-5" />
                    Why Choose Family Kebab House?
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <Check className="text-secondary mr-3 h-4 w-4" />
                      Authentic recipes passed down through generations
                    </li>
                    <li className="flex items-center">
                      <Check className="text-secondary mr-3 h-4 w-4" />
                      Fresh ingredients sourced daily
                    </li>
                    <li className="flex items-center">
                      <Check className="text-secondary mr-3 h-4 w-4" />
                      Quick service - orders ready in 15 minutes
                    </li>
                    <li className="flex items-center">
                      <Check className="text-secondary mr-3 h-4 w-4" />
                      Party orders welcome
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Lunch Offers */}
      <section className="py-16 bg-gradient-to-r from-secondary to-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-poppins text-4xl font-bold text-white mb-4">
            <Clock className="inline mr-3 h-8 w-8" />
            Lunch Time Offers
          </h2>
          <p className="text-green-100 text-xl mb-8">Special deals available Monday to Sunday</p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="text-5xl font-bold text-white mb-4">12:00 - 14:30</div>
            <p className="text-green-100 text-lg mb-6">
              Enjoy special pricing on selected menu items during our lunch hours. 
              Perfect for a quick, delicious meal that fits your schedule!
            </p>
            <a href="tel:01692584100">
              <Button className="bg-white text-secondary hover:bg-gray-100">
                <Phone className="mr-2 h-4 w-4" />
                Call for Lunch Specials
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-poppins text-4xl font-bold text-charcoal mb-8">Ready to Order?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Call us now and your delicious meal will be ready in just 15 minutes! 
            We're located at 79 High Street, Stalham, Norwich.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:01692584100">
              <Button size="lg" className="bg-accent text-white hover:bg-orange-600">
                <Phone className="mr-3 h-5 w-5" />
                Call 01692 584100
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white">
                <MapPin className="mr-3 h-5 w-5" />
                Get Directions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
