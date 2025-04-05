import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "../RTK/features/authUserSlice";
// import { toast } from 'sonner';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!email || !password) {
      // toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    const fetchLogin = async (data) => {
      try {
        await dispatch(loginUser(data)).unwrap();
        navigate("/");
      } catch (error) {
        // toast.error(error.message || 'Failed to log in');
      } finally {
        setIsSubmitting(false);
      }
    }
    fetchLogin({ email, password})
  }; 
  useEffect(() => {
    window.scrollTo(0, 130);
  }, [location]);
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div>
          <div className="text-center">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold text-primary">
                Gadget<span className="text-secondary">Hub</span>
              </span>
            </Link>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:text-primary-dark"
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:border-primary focus:outline-none focus:ring-primary"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-sm font-medium text-primary hover:text-primary-dark"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 pr-10 focus:border-primary focus:outline-none focus:ring-primary"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center rounded-md bg-primary py-3 px-4 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 transition-colors"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <div className="text-sm text-center text-gray-500">
          By signing in, you agree to our{" "}
          <Link
            href="#"
            className="font-medium text-primary hover:text-primary-dark"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="font-medium text-primary hover:text-primary-dark"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
