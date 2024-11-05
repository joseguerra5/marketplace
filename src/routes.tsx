import { createBrowserRouter } from "react-router-dom"
import { AppLayout } from "./pages/_layouts/app"
import { SignIn } from "./pages/auth/sign-in"
import { AuthLayout } from "./pages/_layouts/auth"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout/>,
    children: [
      {path: "/sign-in", element: <SignIn/>},
    ]
  },

  {
    path: "/",
    element: <AppLayout/>,
    children: [
      {path: "/sign-in", element: <SignIn/>},
    ]
  },


  //para todas as páginas que não estão registradas serem renderizadas a página notfound
  {
    path: "*",
    //element: <NotFound />,
  },
])