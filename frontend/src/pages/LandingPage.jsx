import React, { useState, useEffect } from "react";
import { ChefHat, Truck, CreditCard, Star, Clock, Shield, MapPin, Utensils, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
 const navigate=useNavigate()
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Food Enthusiast",
      image: "https://ui-avatars.com/api/?name=Sarah+Mitchell&background=ff6b35&color=fff&size=100",
      text: "Yumzy has completely transformed my dining experience! The delivery is lightning-fast and the food arrives piping hot every single time.",
      rating: 5
    },
    {
      name: "James Rodriguez",
      role: "Restaurant Owner",
      image: "https://ui-avatars.com/api/?name=James+Rodriguez&background=ff6b35&color=fff&size=100",
      text: "As a restaurant owner, Yumzy has helped us reach more customers and grow our business by 300%. The platform is incredibly easy to use!",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Busy Professional",
      image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=ff6b35&color=fff&size=100",
      text: "The real-time tracking feature is a game-changer. I can plan my day knowing exactly when my meal will arrive. Absolutely love it!",
      rating: 5
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users", icon: Users },
    { number: "2K+", label: "Restaurant Partners", icon: Utensils },
    { number: "100K+", label: "Orders Delivered", icon: Truck },
    { number: "4.8★", label: "Average Rating", icon: Star }
  ];

  const features = [
    {
      icon: Utensils,
      title: "Endless Variety",
      description: "Explore thousands of restaurants, cafes, and cloud kitchens offering every cuisine imaginable.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Truck,
      title: "Lightning Fast",
      description: "Real-time tracking with average delivery in 30 minutes. Your food arrives fresh and hot.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Multiple payment options with bank-grade encryption. Your transactions are always safe.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Star,
      title: "Best Quality",
      description: "Verified restaurants with ratings and reviews. Only the best food reaches your doorstep.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "24/7 Available",
      description: "Craving midnight snacks? We've got you covered round the clock, every day of the year.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Contactless & Safe",
      description: "Prioritizing your health with contactless delivery and stringent hygiene protocols.",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  const howItWorks = [
    { step: "1", title: "Choose Your Food", desc: "Browse restaurants and pick your favorites", icon: MapPin },
    { step: "2", title: "Place Your Order", desc: "Add to cart and checkout securely", icon: ChefHat },
    { step: "3", title: "Track Delivery", desc: "Watch your order come to you in real-time", icon: Truck }
  ];

  const handleNavigation = (path) => {
    console.log(`Navigate to: ${path}`);
    alert(`Would navigate to: ${path}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white overflow-hidden">
      {/* Animated Header */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white shadow-lg py-3" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => handleNavigation("/")}
          >
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <ChefHat className="text-white" size={28} />
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Yumzy
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="px-6 py-2 border-2 border-orange-500 text-orange-600 rounded-full hover:bg-orange-50 transition-all duration-300 font-semibold hover:scale-105"
              onClick={() => navi("/signin")}
            >
              Sign In
            </button>
            <button
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:shadow-lg transition-all duration-300 font-semibold hover:scale-105"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Animations */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-[fadeIn_1s_ease-in]">
              <div className="inline-block">
                <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                  🎉 Now delivering in 100+ cities
                </span>
              </div>
              <h2 className="text-6xl font-black leading-tight">
                Delicious Food
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> Delivered </span>
                in Minutes
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience the joy of having your favorite meals delivered right to your doorstep. Fast, fresh, and absolutely delicious.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:shadow-2xl transition-all duration-300 font-bold text-lg hover:scale-105 flex items-center space-x-2"
                  onClick={() => handleNavigation("/signup")}
                >
                  <span>Order Now</span>
                  <TrendingUp size={20} />
                </button>
                <button
                  className="px-8 py-4 bg-white border-2 border-gray-200 rounded-full hover:border-orange-500 transition-all duration-300 font-bold text-lg hover:scale-105"
                  onClick={() => handleNavigation("/restaurants")}
                >
                  Explore Restaurants
                </button>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                {stats.slice(0, 2).map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-3xl font-black text-orange-600">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-[float_3s_ease-in-out_infinite]">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-4 shadow-lg hover:scale-105 transition-transform duration-300">
                    <div className="bg-orange-500 rounded-xl p-3 w-fit mb-3">
                      <Utensils className="text-white" size={24} />
                    </div>
                    <div className="font-bold text-gray-800">Italian</div>
                    <div className="text-sm text-gray-500">120+ Restaurants</div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-lg hover:scale-105 transition-transform duration-300 mt-8">
                    <div className="bg-red-500 rounded-xl p-3 w-fit mb-3">
                      <ChefHat className="text-white" size={24} />
                    </div>
                    <div className="font-bold text-gray-800">Chinese</div>
                    <div className="text-sm text-gray-500">95+ Restaurants</div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-lg hover:scale-105 transition-transform duration-300">
                    <div className="bg-blue-500 rounded-xl p-3 w-fit mb-3">
                      <Star className="text-white" size={24} />
                    </div>
                    <div className="font-bold text-gray-800">Indian</div>
                    <div className="text-sm text-gray-500">200+ Restaurants</div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-lg hover:scale-105 transition-transform duration-300 mt-8">
                    <div className="bg-green-500 rounded-xl p-3 w-fit mb-3">
                      <Truck className="text-white" size={24} />
                    </div>
                    <div className="font-bold text-gray-800">Fast Food</div>
                    <div className="text-sm text-gray-500">150+ Restaurants</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx} 
                  className="text-center text-white transform hover:scale-110 transition-transform duration-300"
                >
                  <Icon className="mx-auto mb-3" size={36} />
                  <div className="text-4xl font-black mb-2">{stat.number}</div>
                  <div className="text-orange-100 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-black mb-4">
              Why Choose <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Yumzy?</span>
            </h3>
            <p className="text-xl text-gray-600">Everything you need for the perfect food ordering experience</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx}
                  className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div className={`bg-gradient-to-r ${feature.color} rounded-2xl p-4 w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={32} />
                  </div>
                  <h4 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-black mb-4">How It Works</h3>
            <p className="text-xl text-gray-600">Three simple steps to satisfy your cravings</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="relative text-center">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-lg">
                    {item.step}
                  </div>
                  <Icon className="mx-auto mb-4 text-orange-500" size={48} />
                  <h4 className="text-2xl font-bold mb-3">{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                  {idx < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-3/4 w-1/2 border-t-2 border-dashed border-orange-300"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-black mb-4">What Our Users Say</h3>
            <p className="text-xl text-gray-600">Join thousands of happy customers</p>
          </div>
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <img 
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  className="w-24 h-24 rounded-full border-4 border-orange-500 shadow-lg"
                />
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />
                    ))}
                  </div>
                  <p className="text-xl text-gray-700 italic mb-4 leading-relaxed">
                    "{testimonials[activeTestimonial].text}"
                  </p>
                  <div className="font-bold text-gray-900 text-lg">{testimonials[activeTestimonial].name}</div>
                  <div className="text-orange-600">{testimonials[activeTestimonial].role}</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === activeTestimonial 
                      ? "bg-orange-500 w-8" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-orange-500 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h3 className="text-5xl font-black text-white mb-6">Ready to Order?</h3>
          <p className="text-2xl text-orange-100 mb-10">Join Yumzy today and get your first order with exclusive offers!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className="px-10 py-5 bg-white text-orange-600 rounded-full hover:shadow-2xl transition-all duration-300 font-bold text-xl hover:scale-105"
              onClick={() => handleNavigation("/signup")}
            >
              Sign Up Now
            </button>
            <button
              className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300 font-bold text-xl hover:scale-105"
              onClick={() => handleNavigation("/signin")}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl">
                  <ChefHat className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-black text-white">Yumzy</h3>
              </div>
              <p className="text-gray-400">Delivering happiness, one meal at a time.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Partners</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Become a Partner</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Delivery Partner</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Restaurant Partner</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Yumzy. All rights reserved. Made with ❤️ for food lovers.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}

export default LandingPage;