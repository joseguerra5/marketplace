import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layouts/app";
import { SignIn } from "./pages/auth/sign-in";
import { AuthLayout } from "./pages/_layouts/auth";
import { SignUp } from "./pages/auth/sign-up";
import { Dashboard } from "./pages/app/dashboard";
import { Products } from "./pages/app/products";
import { ProductDetails } from "./pages/app/product-details";
import { AddProduct } from "./pages/app/add-product";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> },
    ],
  },

  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/products", element: <Products /> },
      { path: `/products/:id`, element: <ProductDetails /> },
      { path: `/product/new`, element: <AddProduct /> },
    ],
  },

  //para todas as páginas que não estão registradas serem renderizadas a página notfound
  {
    path: "*",
    //element: <NotFound />,
  },
]);
