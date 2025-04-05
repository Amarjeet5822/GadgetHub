import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CreditCard,
  Shield,
  Truck,
  RefreshCcw,
} from "lucide-react";
import { categories } from "../../RTK/store/backendApi";

const FooterPage = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 mt-16">
      {/* Services section */}
      <div className="container mx-auto px-4 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center text-center p-4">
            <Truck className="w-8 h-8 mb-2 textOrange" />
            <h3 className="font-semibold mb-1">Free Shipping</h3>
            <p className="text-sm text-gray-400">On orders over $50</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <RefreshCcw className="w-8 h-8 mb-2 textOrange" />
            <h3 className="font-semibold mb-1">Easy Returns</h3>
            <p className="text-sm text-gray-400">30-day return policy</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <Shield className="w-8 h-8 mb-2 textOrange" />
            <h3 className="font-semibold mb-1">Secure Payments</h3>
            <p className="text-sm text-gray-400">Your data is protected</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <CreditCard className="w-8 h-8 mb-2 textOrange" />
            <h3 className="font-semibold mb-1">Flexible Payment</h3>
            <p className="text-sm text-gray-400">Multiple payment methods</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8 mb-8">
        {/* About column */}
        <div>
          <Link to="/" className="inline-block mb-4">
            <span className="text-xl font-bold text-white">
              Gadget<span className="textOrange">Hub</span>
            </span>
          </Link>
          <p className="text-gray-400 mb-4 text-sm">
            Your one-stop destination for all your electronic needs. We offer
            the latest gadgets with the best prices and quality service.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:textOrange">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:textOrange">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:textOrange">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:textOrange">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Categories column */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.slice(0, 6).map((category) => (
              <li key={category.id}>
                <Link
                  to={`/category/${category.id}`}
                  className="text-gray-400 hover:textOrange text-sm"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links column */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/products"
                className="text-gray-400 hover:textOrange text-sm"
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                to="/products?discount=true"
                className="text-gray-400 hover:textOrange text-sm"
              >
                Deals & Promotions
              </Link>
            </li>
            <li>
              <Link
                to="/products?new=true"
                className="text-gray-400 hover:textOrange text-sm"
              >
                New Arrivals
              </Link>
            </li>
            <li>
              <Link
                to="/account"
                className="text-gray-400 hover:textOrange text-sm"
              >
                My Account
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="text-gray-400 hover:textOrange text-sm"
              >
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                className="text-gray-400 hover:textOrange text-sm"
              >
                Wishlist
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact column */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <MapPin className="w-5 h-5 mr-2 textOrange flex-shrink-0 mt-0.5" />
              <span className="text-gray-400 text-sm">
                123 Tech Street, San Francisco, CA 94107
              </span>
            </li>
            <li className="flex items-center">
              <Phone className="w-5 h-5 mr-2 textOrange" />
              <span className="text-gray-400 text-sm">(123) 456-7890</span>
            </li>
            <li className="flex items-center">
              <Mail className="w-5 h-5 mr-2 textOrange" />
              <span className="text-gray-400 text-sm">
                support@gadgethub.com
              </span>
            </li>
          </ul>
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">
              Subscribe to our newsletter
            </h4>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white px-3 py-2 text-sm rounded-l-md focus:outline-none flex-grow"
              />
              <button
                type="submit"
                className="bg-secondary hover:bg-secondary/80 px-3 py-2 rounded-r-md text-white text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2023 GadgetHub. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/" className="text-gray-400 hover:textOrange text-sm">
              Privacy Policy
            </Link>
            <Link to="/" className="text-gray-400 hover:textOrange text-sm">
              Terms of Service
            </Link>
            <Link to="/" className="text-gray-400 hover:textOrange text-sm">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
