import { Box, ChartColumnBig, Plus } from "lucide-react";
import { NavLink } from "./nav-link";

export function Header() {
  return (
    <header className="flex justify-between  py-5 ">
      <div><img src="../src/assets/logo-icon.svg" /></div>

      <div className="flex gap-2">
        <NavLink to="/dashboard">
            <ChartColumnBig/>
            Dashboard
          </NavLink>

          <NavLink to="/products">
            <Box/>
            Produtos
        </NavLink>
      </div>
      <div className="flex gap-3 items-center justify-center">
       <button className="border-none bg-orange-base text-white flex gap-2 p-1 rounded-md">
        <Plus/>
        <span>Novo produto</span>
       </button>
       <img src="../src/assets/avatar.jpg" alt="" className="rounded-xl aspect-square w-12" />
      </div>
    </header>
    
    
  )
}