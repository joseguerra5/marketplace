import { Box, ChartColumnBig, Plus } from "lucide-react";
import { NavLink } from "./nav-link";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex justify-between  py-5 ">
      <Link to="/dashboard"><img src="../src/assets/logo-icon.svg" /></Link>

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
       <Link to="/product/new" className="border-none bg-orange-base hover:bg-orange-dark text-white flex gap-2 p-1 rounded-md">
        <Plus/>
        <span>Novo produto</span>
       </Link>
       <img src="../src/assets/avatar.jpg" alt="" className="rounded-xl aspect-square w-12" />
      </div>
    </header>
    
    
  )
}