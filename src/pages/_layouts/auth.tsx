import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="grid grid-cols-5 max-w-[1280px] m-auto min-h-screen">
      <div className="flex flex-col gap-4 col-span-3 ">
        <img src="../public/logo.svg" className="w-64 m-[40px]"/>
        <img src="../public/auth-image.png" alt="" className="w-full"/>
      </div>
      <div className="col-span-2">
        <Outlet/>
      </div>
    </div>
    
  )
}