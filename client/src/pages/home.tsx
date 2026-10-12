import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  Heart,
  Check,
  CreditCard,
} from "lucide-react";
import Testimonials from "@/components/testimonials";

export default function Home() {
  const specialOffers = [
    {
      id: "pizza-offer-1",
      name: "Pizza Offer 1",
      description: '2 X 10" Pizza from set menu',
      price: 17.2,
      image:
        "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&h=600",
    },
    {
      id: "pizza-offer-2",
      name: "Pizza Offer 2",
      description: '2 X 12" Pizza from set menu',
      price: 22.5,
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&h=600",
    },
    {
      id: "family-deal",
      name: "Family Deal",
      description:
        '10" Pizza + 3 toppings + 6pcs Chicken Nuggets + 1 CHICKEN FILLET BURGER + 2PCS FRIED CHICKEN + 2X CHIPS + Bottle of soft drink',
      price: 26.9,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&h=600",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="rela*ive min-h-screen flex items-center*>
        <div
          className*"absolute inset-0 bg-cover bg-cent*r bg-no-repeat"
          style={{*            backgroundImage:
     *        "linear-gradient(rgba(46, *6, 46, 0.7), rgba(46, 46, 46, 0.7)*, url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&h=1080')*,
          }}
        />

       *<div className="relative container*mx-auto px-4 py-20">
          <di* className="max-w-4xl mx-auto text*center text-white">
            <d*v className="mb-6">
              *Badge className="bg-secondary text*white px-4 py-2 text-sm font-semib*ld">
                <Star classNa*e="mr-2 h-4 w-4" />
              * Serving Norwich for 20+ Years
   *          </Badge>
            </d*v>

            <h1 className="fon*-poppins text-5xl md:text-7xl font*bold mb-6">
              Authenti* <span className="text-accent">Keb*bs</span>{" "}
              <span*className="text-primary">Fresh Piz*as</span>
            </h1>

     *      <p className="text-xl md:tex*-2xl mb-8 text-gray-200 leading-re*axed">
              Stalham in No*wich&apos;s premier kebab shop off*ring
              mouth-watering *oner kebabs, crispy pizzas, and mo*e.{" "}
              <strong>Open*now</strong> for dine-in and takea*ay!
            </p>

            *div className="flex flex-col sm:fl*x-row gap-4 justify-center items-c*nter mb-8">
              tel:0169*584100
                <Button
   *              size="lg"
          *       className="bg-primary text-*hite hover:bg-red-700 transform ho*er:scale-105 transition-all"
     *          >
                  <Pho*e className="mr-3 h-5 w-5" />
    *             Order Now: 01692 5841*0
                </Button>
      *       </a>

              <Link t*="/menu">
                <Button
*                 size="lg"
       *          variant="outline"
      *           className="border-2 bor*er-white text-white hover:bg-white*hover:text-charcoal"
             *  >
                  <span classN*me="mr-3">📋</span>
              *   View Menu
                </But*on>
              </Link>
        *   </div>

            <div classN*me="flex flex-col sm:flex-row flex*wrap gap-6 justify-center items-ce*ter text-sm">
              <div c*assName="flex items-center">
     *          <MapPin className="text-*ccent mr-2 h-4 w-4" />
           *    <span>79 High Street, Stalham,*Norwich NR12 9BB</span>
              </div>

              <div className="flex items-center">
                <Clock className="text-accent mr-2 h-4 w-4" />
                <span>Lunch Offers: 12:00 - 14:30</span>
              </div>

              <div className="flex items-center">
                <CreditCard className="text-accent mr-2 h-4 w-4" />
                <span>Cash and card payments accepted in store</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16*bg-gradient-to-r from-primary to-r*d-600">
        <div className="co*tainer mx-auto px-4">
          <d*v className="text-center mb-12">
 *          <h2 className="font-popp*ns text-4xl font-bold text-white m*-4">
              Special Meal De*ls
            </h2>

            *p className="text-red-100 text-lg"*
              Unbeatable value fo* money - Perfect for families!
   *        </p>
          </div>

   *      <div className="grid md:grid*cols-3 gap-8">
            {specia*Offers.map((offer) => (
          *   <Card
                key={offe*.id}
                className="ov*rflow-hidden transform hover:scale*105 transition-transform"
        *     >
                {offer.imag*}

                <CardContent cl*ssName="p-6">
                  <h* className="font-poppins text-xl f*nt-bold text-charcoal mb-2">
     *              {offer.name}
       *          </h3>

                 *<p className="text-gray-600 mb-4">*offer.description}</p>

          *       <div className="flex items-*enter justify-between">
          *         <span className="text-3xl font-bold text-primary">
                      £{offer.price.toFixed(2)}
                    </span>

                    tel:01692584100
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
      <section className="py-20*bg-gray-50">
        <div classNam*="container mx-auto px-4">
       *  <div className="grid lg:grid-col*-2 gap-16 items-center">
         *  <div>
              <h2 classNam*="font-poppins text-5xl font-bold *ext-charcoal mb-6">
              * Our Story
              </h2>

  *           <div className="space-y*6 text-lg text-gray-700 leading-re*axed">
                <p>
       *          For over <strong classNa*e="text-primary">20 years</strong>*
                  Family Kebab Ho*se has been serving the finest aut*entic
                  kebabs and*fresh pizzas to the wonderful comm*nity of Stalham
                  *nd Norwich.
                </p>

*               <p>
               *  We pride ourselves on using only*the{" "}
                  <strong*className="text-secondary">
      *             freshest ingredients
*                 </strong>
       *          , traditional cooking me*hods, and providing exceptional
  *               customer service th*t keeps our community coming back *or
                  more.
       *        </p>
              </div>
*              <div className="grid*grid-cols-3 gap-6 mt-12">
        *       <div className="text-center*>
                  <div className*"text-3xl font-bold text-primary m*-2">
                    20+
     *            </div>
               *  <div className="text-gray-600">Y*ars Serving</div>
                */div>

                <div classN*me="text-center">
                * <div className="text-3xl font-bol* text-secondary mb-2">
           *        100%
                  </d*v>
                  <div classNam*="text-gray-600">Fresh Daily</div>*                </div>

          *     <div className="text-center">*                  <div className="*ext-3xl font-bold text-accent mb-2*>
                    ★★★★★
      *           </div>
                * <div className="text-gray-600">Lo*al Favorite</div>
                */div>
              </div>

      *       <div className="mt-8">
    *           <Link to="/about">
    *             <Button className="bg*secondary text-white hover:bg-gree*-700">
                    Learn M*re About Us
                  </Bu*ton>
                </Link>
     *        </div>
            </div>
*            <div className="space-*-6">
              <img
          *     src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&h=600"
  *             alt="Family restauran* kitchen with fresh food preparati*n"
                className="roun*ed-2xl shadow-xl w-full h-80 objec*-cover"
              />

        *     <Card>
                <CardC*ntent className="p-6">
           *      <h3 className="font-poppins *ext-xl font-bold text-charcoal mb-* flex items-center">
             *      <Heart className="text-prima*y mr-3 h-5 w-5" />
               *    Why Choose Family Kebab House?*                  </h3>

         *        <ul className="space-y-3 t*xt-gray-700">
                    *li className="flex items-center">
*                     <Check classN*me="text-secondary mr-3 h-4 w-4 fl*x-shrink-0" />
                   *  <span>
                        A*thentic recipes passed down throug* generations
                     *</span>
                    </li>
*                    <li className=*li>

                    <li className="flex items-center">
                      <Check className="text-secondary mr-3 h-4 w-4 flex-shrink-0" />
                      <span>
                        Quick service - orders normally ready in around 15
                        minutes
                      </span>
                    </li>

                    <li className="flex items-center">
                      <Check className="text-secondary mr-3 h-4 w-4 flex-shrink-0" />
                      <span>Cash and card payments accepted in store</span>
                    </li>

                    <li className="flex items-center">
                      <Check className="text-secondary mr-3 h-4 w-4 flex-shrink-0" />
                      <span>Party orders welcome</span>
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

          <p className="text-green-100 text-xl mb-8">
            Special deals available Monday to Sunday
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="text-5xl font-bold text-white mb-4">
              12:00 - 14:30
            </div>

            <p className="text-green-100 text-lg mb-6">
              Enjoy special pricing on selected menu items during our lunch
              hours. Perfect for a quick, delicious meal that fits your
              schedule!
            </p>

            tel:01692584100
              <Button className="bg-white text-secondary hover:bg-gray-100">
                <Phone className="mr-2 h-4 w-4" />
                Call for Lunch Specials
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Quick Contact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-poppins text-4xl font-bold text-charcoal mb-8">
            Ready to Order?
          </h2>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Call us to place your order and collect it from 79 High Street,
            Stalham, Norwich. Cash and card payments are accepted in store.
            Please note that we do not provide delivery.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            tel:01692584100
              <Button
                size="lg"
                className="bg-accent text-white hover:bg-orange-600"
              >
                <Phone className="mr-3 h-5 w-5" />
                Call 01692 584100
              </Button>
            </a>

            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white"
              >
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
