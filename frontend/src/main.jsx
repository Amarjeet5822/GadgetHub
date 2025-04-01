import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage, Home } from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      // { path: "/login", element: <LoginPage /> },
      // { path: "/login/otp-login", element: <OTPLogin /> },
      // { path: "/wishlist", element: <Wishlist /> },
      // { path: "/product", element: <ProductPage /> },
      // { path: "/product/:productId", element: <ProductDetails /> },
      // { path: "/product/men-tshirts", element: <MenTshirts /> },
      // { path: "/product/men-casual-shirts", element: <MenCasualShirts /> },
      // { path: "/product/men-formal-shirts", element: <MenFormalShirts /> },
      // { path: "/product/men-sweat-shirts", element: <MenSweatShirts /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
