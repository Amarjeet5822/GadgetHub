import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AccountPage,
  BagPage,
  CategoryPage,
  ErrorPage,
  HomePage,
  LoginPage,
  ProductDetailPage,
  ProductPage,
  RegisterPage,
  WishListPage,
} from "./pages/index.js";
import { Provider } from "react-redux";
import { store } from "./RTK/store/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <ProductPage /> },
      { path: "/products/:productId", element: <ProductDetailPage /> },
      { path: "/category/:categoryId", element: <CategoryPage /> },
      { path: "/bag", element: <BagPage /> },
      { path: "/wishlist", element: <WishListPage /> },
      { path: "/account", element: <AccountPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
