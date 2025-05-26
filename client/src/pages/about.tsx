import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Heart, Check, Award, Users, Clock, Star } from "lucide-react";

export default function About() {
  const achievements = [
    { icon: "🏆", value: "20+", label: "Years of Excellence" },
    { icon: "👨‍👩‍👧‍👦", value: "1000+", label: "Happy Families Served" },
    { icon: "🥇", value: "100%", label: "Fresh Ingredients Daily" },
    { icon: "⭐", value: "5★", label: "Local Community Favorite" }
  ];

  const whyChooseUs = [
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: "Family Tradition",
      description: "Authentic recipes passed down through generations, ensuring every dish carries the true taste of tradition."
    },
    {
      icon: <Check className="h-6 w-6 text-secondary" />,
      title: "Quality Ingredients",
      description: "We source only the freshest ingredients daily, never compromising on quality for our valued customers."
    },
    {
      icon: <Clock className="h-6 w-6 text-accent" />,
      title: "Quick Service",
      description: "Your order will be ready in just 15 minutes, perfect for busy lifestyles without sacrificing taste."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Community Focus",
      description: "We've been part of the Stalham and Norwich community for over 20 years, building lasting relationships."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-secondary text-white px-4 py-2 text-sm font-semibold mb-6">
              <Star className="mr-2 h-4 w-4" />
              Established 2004
            </Badge>
            <h1 className="font-poppins text-5xl font-bold text-charcoal mb-6">About Family Kebab House</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              For over two decades, we've been Norwich's premier destination for authentic kebabs, 
              fresh pizzas, and exceptional service. Our story is one of family, tradition, and 
              unwavering commitment to quality.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-poppins text-4xl font-bold text-charcoal mb-8">Our Journey</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Family Kebab House opened its doors in <strong className="text-primary">2004</strong> with a simple mission: 
                  to bring authentic, delicious food to the wonderful community of Stalham and Norwich. 
                  What started as a small family dream has grown into the area's most trusted kebab shop.
                </p>
                <p>
                  Every day, we prepare our dishes using <strong className="text-secondary">traditional recipes</strong> 
                  and the freshest ingredients available. Our doner kebabs are carved fresh, our pizzas are 
                  made to order, and every meal is prepared with the same care and attention we'd give our own family.
                </p>
                <p>
                  Located at <strong>79 High Street in Stalham</strong>, we've become more than just a restaurant - 
                  we're a cornerstone of the community, serving generations of families who trust us with their 
                  dining experience.
                </p>
                <p>
                  Our commitment to <strong className="text-accent">exceptional service</strong> means your order 
                  is always ready in 15 minutes, whether you're dining in or taking away. We welcome party orders 
                  and take pride in being part of your special occasions.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Family restaurant kitchen with fresh food preparation" 
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
              
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Warm restaurant interior with family atmosphere" 
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-4xl font-bold text-charcoal mb-4">Our Achievements</h2>
            <p className="text-lg text-gray-600">Numbers that speak to our commitment to excellence</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{achievement.icon}</div>
                <div className="text-4xl font-bold text-primary mb-2">{achievement.value}</div>
                <div className="text-gray-600 font-medium">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-poppins text-4xl font-bold text-charcoal mb-4">Why Choose Family Kebab House?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're not just another kebab shop - we're your neighbors, committed to serving 
              the best food with genuine care and authentic flavors.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-poppins text-xl font-bold text-charcoal mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Special */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Authentic doner kebab preparation with traditional methods" 
                className="rounded-2xl shadow-xl w-full h-96 object-cover"
              />
            </div>
            
            <div>
              <h2 className="font-poppins text-4xl font-bold text-charcoal mb-8">What Makes Us Special</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Award className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-charcoal text-lg mb-2">Authentic Recipes</h3>
                    <p className="text-gray-600">Our recipes have been perfected over generations, ensuring every bite delivers authentic Mediterranean flavors.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Check className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-charcoal text-lg mb-2">Fresh Daily Preparation</h3>
                    <p className="text-gray-600">Everything is prepared fresh each day - from our marinated meats to our hand-rolled pizza dough.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Heart className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-charcoal text-lg mb-2">Community Commitment</h3>
                    <p className="text-gray-600">We're proud to be part of the local community, supporting local events and serving families for over 20 years.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-charcoal text-lg mb-2">Reliable Service</h3>
                    <p className="text-gray-600">Consistent quality and timing you can depend on - your order ready in 15 minutes, every time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-poppins text-4xl font-bold text-white mb-4">Experience the Family Kebab House Difference</h2>
          <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
            Join the thousands of satisfied customers who have made us their go-to choice for 
            authentic kebabs and fresh pizzas in Norwich.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                View Our Menu
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Visit Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
