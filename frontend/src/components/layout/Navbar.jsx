
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Menu, X, User, Phone, Laptop, Headphones, Tablet, Monitor, Gamepad, Camera, Package } from 'lucide-react';
import { categories } from '../../RTK/store/backendApi';
import { useDispatch, useSelector } from 'react-redux';
import { getUserStatus } from '../../RTK/features/authUserSlice';
// import { cn } from '../lib/utils';

const Navbar = () => {
  const { authStatus } = useSelector(state => state.authUser);
  const cartItems = []
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    e.preventDefault();
    // if (searchTerm.trim()) {
    //   navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    //   setSearchTerm('');
    //   setIsMenuOpen(false);
    // }
  };

  // Listen for scroll events to change navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Get category icon
  const getCategoryIcon = (categoryId) => {
    const iconMap = {
      smartphones: <Phone className="w-5 h-5" />,
      laptops: <Laptop className="w-5 h-5" />,
      audio: <Headphones className="w-5 h-5" />,
      tablets: <Tablet className="w-5 h-5" />,
      tvs: <Monitor className="w-5 h-5" />,
      gaming: <Gamepad className="w-5 h-5" />,
      cameras: <Camera className="w-5 h-5" />,
      accessories: <Package className="w-5 h-5" />,
      wearables: <Watch className="w-5 h-5" />,
    };

    return iconMap[categoryId] || <Package className="w-5 h-5" />;
  };

  return (
    <header 
      className="sticky top-0 z-40 transition-all duration-200 bg-white border-b border-gray-200"
    >
      {/* Top bar */}
      <div className="bg-primary text-white px-4 py-1 text-xs sm:text-sm text-center">
        Free shipping on orders over $50 | 30-day returns
      </div>
      
      {/* Main navbar */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold textBlue">Gadget<span className="textOrange">Hub</span></span>
        </Link>

        {/* Search form - desktop */}
        <form 
          onSubmit={handleSearch}
          className="hidden md:flex flex-grow max-w-md mx-4"
        >
          <div className="relative w-full">
            <input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-gray-300 pl-4 pr-10 py-2 focus:outline-none focus:border-primary"
            />
            <button 
              type="submit"
              className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:textBlue"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Navigation icons */}
        <div className="flex items-center space-x-3">
          <Link 
            to="/bag" 
            className="relative p-2 text-gray-700 hover:textBlue transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
          
          <Link 
            to={authStatus.isAuthenticated ? "/wishlist" : "/login"} 
            className="p-2 text-gray-700 hover:textBlue transition-colors hidden sm:block"
          >
            <Heart className="w-6 h-6" />
          </Link>

          {authStatus.isAuthenticated ? (
            <Link 
              to="/account" 
              className="p-2 text-gray-700 hover:textBlue transition-colors hidden sm:block"
            >
              <User className="w-6 h-6" />
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="p-2 text-gray-700 hover:textBlue transition-colors hidden sm:block"
            >
              <User className="w-6 h-6" />
            </Link>
          )}

          {/* Mobile menu button */}
          <button 
            className="p-2 text-gray-700 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Category navigation */}
      <nav className="hidden md:block bg-gray-100 py-2 px-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          {/* Categories dropdown */}
          <div className="relative">
            <button 
              className="flex items-center gap-2 px-4 py-1 font-medium text-gray-800 hover:textBlue"
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            >
              All Categories
              <svg 
                className={`w-4 h-4 transition-transform ${isCategoryDropdownOpen ? 'transform rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Category dropdown */}
            {isCategoryDropdownOpen && (
              <div className="absolute top-full left-0 z-50 w-60 bg-white rounded-lg shadow-xl py-2 mt-1 animate-in fade-in slide-in">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    onClick={() => setIsCategoryDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    {getCategoryIcon(category.id)}
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Popular categories */}
          <div className="flex space-x-4">
            {categories.slice(0, 5).map((category) => (
              <Link 
                key={category.id}
                to={`/category/${category.id}`}
                className="text-sm text-gray-600 hover:textBlue"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Special links */}
          <div className="hidden lg:flex space-x-4">
            <Link to="/products?discount=true" className="text-sm text-gray-600 hover:textBlue">
              Deals
            </Link>
            <Link to="/products?new=true" className="text-sm text-gray-600 hover:textBlue">
              New Arrivals
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t absolute w-full z-50 left-0 shadow-xl animate-in fade-in slide-in">
          {/* Mobile search */}
          <form 
            onSubmit={handleSearch}
            className="p-4 border-b"
          >
            <div className="relative">
              <input
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border border-gray-300 pl-4 pr-10 py-2 focus:outline-none focus:border-primary"
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 h-full px-3 text-gray-500"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Mobile navigation links */}
          <div className="py-2">
            <Link 
              to="/" 
              className="block px-4 py-3 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <div className="px-4 py-3 font-medium">Categories</div>
            <div className="pl-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {getCategoryIcon(category.id)}
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
            <Link 
              to="/products" 
              className="block px-4 py-3 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            {authStatus.isAuthenticated ? (
              <>
                <Link 
                  to="/account" 
                  className="block px-4 py-3 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
                <Link 
                  to="/wishlist" 
                  className="block px-4 py-3 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Favorites
                </Link>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block px-4 py-3 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

// Missing Watch component for wearables
const Watch = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="7" />
    <polyline points="12 9 12 12 13.5 13.5" />
    <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83" />
  </svg>
);

export default Navbar;
