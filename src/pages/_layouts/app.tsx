import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div>
      App Layout
      <Outlet/>
    </div>
    
  )
}