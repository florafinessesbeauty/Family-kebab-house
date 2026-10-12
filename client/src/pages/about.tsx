import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Heart,
  Check,
  Award,
  Users,
  Clock,
  Star,
  CreditCard,
} from "lucide-react";

export default function About() {
  const achievements = [
    { icon: "🏆", value: "20+", label: "Years of Excellence" },
    { icon: "👨‍👩‍👧‍👦", value: "1000+", label: "Happy Families Served" },
    { icon: "🥇", value: "100%", label: "Fresh Ingredients Daily" },
    { icon: "⭐", value: "5★", label: "Local Community Favorite" },
  ];

  const whyChooseUs = [
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: "Family Tradition",
      description:
        "Authentic recipes passed down through generations, ensuring every dish carries the true taste of tradition.",
    },
    {
      icon: <Check className="h-6 w-6 text-secondary" />,
      title: "Quality Ingredients",
      description:
        "We source only the freshest ingredients daily, never compromising on quality for our valued customers.",
    },
    {
      icon: <Clock className="h-6 w-6 text-accent" />,
      title: "Quick Service",
      description:
        "Orders are normally ready in around 15 minutes, making takeaway collection quick and convenient.",
    },
    {
      icon: <CreditCard className="h-6 w-6 text-secondary" />,
      title: "Cash and Card Accepted",
      description:
        "Pay by cash, credit card or debit card when visiting our physical shop.",
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Community Focus",
      description:
        "We've been part of the Stalham and Norwich community for over 20 years, building lasting relationships.",
    },
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

            <h1 className="font-poppins text-5xl font-bold text-charcoal mb-6">
              About Family Kebab House
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              For over two decades, we've been serving authentic kebabs, fresh
              pizzas, and quality food to the community of Stalham and Norwich.
              Our story is one of family, tradition, and unwavering commitment
              to quality.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-poppins text-4xl font-bold text-charcoal mb-8">
                Our Journey
              </h2>

              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Family Kebab House opened its doors in{" "}
                  <strong className="text-primary">2004</strong> with a simple
                  mission: to bring authentic, delicious food to the wonderful
                  community of Stalham and Norwich. What started as a small
                  family dream has grown into a trusted local kebab shop.
                </p>

                <p>
                  Every day, we prepare our dishes using{" "}
                  <strong className="text-secondary">
                    traditional recipes
                  </strong>{" "}
                  and the freshest ingredients available. Our doner kebabs are
                  carved fresh, our pizzas are made to order, and every meal is
                  prepared with the same care and attention we'd give our own
                  family.
                </p>

                <p>
                  Located at <strong>79 High Street in Stalham</strong>, we've
                  become part of the local community, serving generations of
                  families who continue to visit our shop.
                </p>

                <p>
                  Our commitment to{" "}
                  <strong className="text-accent">
                    exceptional service
                  </strong>{" "}
                  means orders are normally ready in around 15 minutes, whether
                  you're dining in or collecting a takeaway. We welcome party
                  orders and take pride in being part of your special
                  occasions.
                </p>

                <p>
                  Customers can pay by{" "}
                  <strong className="text-secondary">
                    cash, credit card or debit card
                  </strong>{" "}
                  when visiting our physical shop. Please note that we do not
                  provide a delivery service.
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
            <h2 className="font-poppins text-4xl font-bold text-charcoal mb-4">
              Our Achievements
            </h2>

            <p className="text-lg text-gray-600">
              Numbers that speak to our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement) => (
              <div key={achievement.label} className="text-center">
                <div className="text-5xl mb-4">{achievement.icon}</div>

                <div className="text-4xl font-bold text-primary mb-2">
                  {achievement.value}
                </div>

                <div className="text-gray-600 font-medium">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-poppins text-4xl font-bold text-charcoal mb-4">
              Why Choose Family Kebab House?
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're not just another kebab shop. We're your neighbours,
              committed to serving quality food with genuine care and authentic
              flavours.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyChooseUs.map((item) => (
              <Card
                key={item.title}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>

                    <div>
                      <h3 className="font-poppins text-xl font-bold text-charcoal mb-3">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
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
              <h2 className="font-poppins text-4xl font-bold text-charcoal mb-8">
                What Makes Us Special
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Award className="h-6 w-6 text-accent mt-1 flex-shrink-0" />

                  <div>
                    <h3 className="font-semibold text-charcoal text-lg mb-2">
                      Authentic Recipes
                    </h3>

                    <p className="text-gray-600">
                      Our recipes have been perfected over generations,
                      ensuring every bite delivers authentic Mediterranean
                      flavours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Check className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />

                  <div>
                    <h3 className="font-semibold text-charcoal text-lg mb-2">
                      Fresh Daily Preparation
                    </h3>

                    <p className="text-gray-600">
                      Everything is prepared fresh each day, from our marinated
                      meats to our pizza dough.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Heart className="h-6 w-6 text-primary mt-1 flex-shrink-0" />

                  <div>
                    <h3 className="font-semibold text-charcoal text-lg mb-2">
                      Community Commitment
                    </h3>

                    <p className="text-gray-600">
                      We're proud to be part of the local community, supporting
                      local events and serving families for over 20 years.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-accent mt-1 flex-shrink-0" />

                  <div>
                    <h3 className="font-semibold text-charcoal text-lg mb-2">
                      Reliable Service
                    </h3>

                    <p className="text-gray-600">
                      Consistent quality and service you can depend on, with
                      orders normally ready in around 15 minutes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CreditCard className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />

                  <div>
                    <h3 className="font-semibold text-charcoal text-lg mb-2">
                      Cash and Card Payments
                    </h3>

                    <p className="text-gray-600">
                      Pay by cash, credit card or debit card when dining in or
                      collecting your order from our shop.
                    </p>
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
          <h2 className="font-poppins text-4xl font-bold text-white mb-4">
            Experience the Family Kebab House Difference
          </h2>

          <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
            Visit us for authentic kebabs and fresh pizzas in Stalham. Dine-in
            and takeaway collection are available, with cash and card payments
            accepted in store.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
              >
                View Our Menu
              </Button>
            </Link>

            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Visit Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
