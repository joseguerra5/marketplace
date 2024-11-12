import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../../components/header";
import { useEffect } from "react";
import { isAxiosError } from "axios";
import { api } from "@/lib/axios";



export function AppLayout() {

  const navigate = useNavigate()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          const code = error.response?.data.message

          if (status === 401 && code === "Unauthorized") {
            navigate("/sign-in", {replace: true})
          }
        }
      }
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])
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