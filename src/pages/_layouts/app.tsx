import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";

export function AppLayout() {
  return (
    <div>
      <div className="max-w-[1280px] m-auto">
        <Header />
      </div>
      <div className="h-px bg-gray-100"></div>
      <Outlet/>
    </div>
    
  )
}