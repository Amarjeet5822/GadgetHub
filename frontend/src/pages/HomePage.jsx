
import HeroSection from "../components/HeroSection"
import FeaturedCategories from '../components/FeaturedCategories';
import { Cpu, CreditCard, Truck, LifeBuoy } from 'lucide-react';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserStatus } from "../RTK/features/authUserSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        await dispatch(getUserStatus()).unwrap();
      } catch (error) {
        console.log("error to get status");
      }
    }
    fetchUserStatus();
  },[]);
  return (
    <div>
      {/* Hero Banner Slider */}
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-8 border-b-2 border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center text-center p-4">
              <Truck className="h-10 w-10 textBlue mb-3" />
              <h3 className="font-medium">Free Delivery</h3>
              <p className="text-sm text-gray-500">On orders over $50</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <CreditCard className="h-10 w-10 textBlue mb-3" />
              <h3 className="font-medium">Secure Payment</h3>
              <p className="text-sm text-gray-500">100% secure payments</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <LifeBuoy className="h-10 w-10 textBlue mb-3" />
              <h3 className="font-medium">24/7 Support</h3>
              <p className="text-sm text-gray-500">Dedicated support</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Cpu className="h-10 w-10 textBlue mb-3" />
              <h3 className="font-medium">Quality Products</h3>
              <p className="text-sm text-gray-500">Certified products</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Categories Grid */}
      <FeaturedCategories />

      {/* Promotion Banner */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className=" rounded-xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              <div className="p-8 md:p-12 flex-1">
                <h2 className="text-3xl font-bold mb-4">Summer Sale</h2>
                <p className="text-lg mb-6">Get up to 50% off on selected items. Limited time offer!</p>
                <Link 
                  href="/products?discount=true" 
                  className="inline-flex bg-white hover:bg-gray-100 textBlue font-medium px-6 py-3 rounded-lg "
                >
                  Shop Now
                </Link>
              </div>
              <div className="md:w-1/2 lg:w-1/3 p-4">
                <img 
                  src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop" 
                  alt="Summer Sale"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
