
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className=" mx-auto px-4 py-16 text-center">
      <h1 className="text-7xl font-bold textBlue mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Oops! Page not found</p>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to="/"
        className="inline-flex bg-primary hover:bg-404found text-white px-6 py-3 rounded-lg transition-colors"
      >
        Back to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
