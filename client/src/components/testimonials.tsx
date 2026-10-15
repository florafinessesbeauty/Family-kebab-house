import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "Stalham",
    rating: 5,
    text: "Been coming here for over 10 years! The doner kebab is absolutely delicious and the staff are always friendly. Best kebab shop in Norfolk without a doubt.",
    date: "2 weeks ago"
  },
  {
    id: "2", 
    name: "Mike Thompson",
    location: "Norwich",
    rating: 5,
    text: "Amazing family-run business! The chicken kebab is perfectly seasoned and the portions are generous. Always ready in 15 minutes as promised. Highly recommend!",
    date: "1 month ago"
  },
  {
    id: "3",
    name: "Emma Wilson",
    location: "Great Yarmouth", 
    rating: 5,
    text: "Drive 20 minutes just for their pizzas! Fresh ingredients, authentic taste, and unbeatable prices. The family meal deal is perfect for our weekly treat.",
    date: "3 weeks ago"
  },
  {
    id: "4",
    name: "David Clarke",
    location: "Wroxham",
    rating: 5,
    text: "Outstanding quality and service! Been ordering from Family Kebab House for years. The mixed kebab is my favorite - always fresh and flavorful.",
    date: "1 week ago"
  },
  {
    id: "5",
    name: "Lisa Brown",
    location: "Stalham",
    rating: 5,
    text: "Best local takeaway by far! The lunch offers are fantastic value and the food is consistently excellent. Wouldn't go anywhere else for our family meals.",
    date: "2 months ago"
  },
  {
    id: "6",
    name: "James Roberts",
    location: "Norwich",
    rating: 5,
    text: "Authentic flavors that remind me of my travels to Turkey. The kofte kebab is incredible and the garlic sauce is the best I've ever had. True family business with heart!",
    date: "3 weeks ago"
  }
];

export default function Testimonials() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins text-4xl font-bold text-charcoal mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Over 20 years of serving authentic flavors has earned us the trust and love of our community. 
            Here's what they have to say about their experience with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-primary mr-3 opacity-50" />
                  <div className="flex space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-charcoal">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                    <span className="text-xs text-gray-400">{testimonial.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary to-red-600 text-white py-8 px-12 rounded-2xl max-w-4xl mx-auto">
            <h3 className="font-poppins text-2xl font-bold mb-4">Join Our Happy Customers!</h3>
            <p className="text-red-100 mb-6">
              Experience why thousands of families choose Family Kebab House for their favorite meals. 
              Call us today and taste the difference 20+ years of dedication makes!
            </p>
            <a href="tel:01692584100">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Order Now: 01692 584100
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}