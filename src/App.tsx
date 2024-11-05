import { RouterProvider } from "react-router-dom";
import { router } from "./routes";


export default function App() {

  return (
    <div className="bg-background h-screen">
     <RouterProvider router={router} />
    </div>
  )
}

