import { getProductsAvailable } from "@/api/get-products-available";
import { getProductsSold } from "@/api/get-products-sold";
import { getSellerViews } from "@/api/get-views-received-month";
import { getViewsPerDay } from "@/api/get-views-received-per-day";
import { useQuery } from "@tanstack/react-query";
import { BadgeDollarSign, Calendar, Loader2, Store, UsersRound } from "lucide-react";
import { useMemo } from "react";
import { CartesianGrid, Line, ResponsiveContainer, XAxis, LineChart, YAxis } from "recharts";

export function Dashboard() {
  const {data: productsSold} = useQuery({
    queryKey: ["productsSold"],
    queryFn: getProductsSold,
  })

  const {data: productsAvailable} = useQuery({
    queryKey: ["productsAvailable"],
    queryFn: getProductsAvailable,
  })

  const {data: sellerViews} = useQuery({
    queryKey: ["sellerViews"],
    queryFn: getSellerViews,
  })

  const {data: viewsPerDay} = useQuery({
    queryKey: ["viewsPerDay"],
    queryFn: () => getViewsPerDay(),
  })

  console.log(viewsPerDay)

  const chartData = useMemo(() => {
    return viewsPerDay?.viewsPerDay.map((chartItem) => {
      const date = new Date(chartItem.date)
      return {
        date: String(date.getDate()).padStart(2, "0"),
        amount: chartItem.amount
      }
    })
  }, [viewsPerDay])

  return (
    <div className="max-w-[1280px] m-auto ">
      <div className="my-10">
        <h1 className="text-gray-500 text-2xl font-bold">Últimos 30 dias</h1>
        <span className="text-gray-300 text-sm font-normal">Confira as estátisticas da sua loja no último mês</span>  
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 p-3 bg-white rounded-3xl min-w-60">
            <div className="bg-blue-light text-blue-dark rounded-xl p-4">
              <BadgeDollarSign  width={60} height={60}/>
            </div>
            <div className="flex flex-col gap-2 self-center">
              <strong className="text-gray-400 font-bold text-3xl ">{productsSold?.amount}</strong>
              <span className="text-gray-300 flex-wr text-xs">produtos<br/> vendidos</span>
            </div>
          </div>

          <div className="flex gap-4 p-3 bg-white rounded-3xl min-w-fit ">
            <div className="bg-blue-light text-blue-dark rounded-xl p-4">
              <Store  width={60} height={60}/>
            </div>
            <div className="flex flex-col gap-2 self-center">
              <strong className="text-gray-400 font-bold text-3xl ">{productsAvailable?.amount}</strong>
              <span className="text-gray-300 flex-wr text-xs">produtos <br/> anunciados</span>
            </div>
          </div>

          <div className="flex gap-4 p-3 bg-white rounded-3xl min-w-fit">
            <div className="bg-blue-light text-gray-300 rounded-xl p-4">
              <UsersRound width={60} height={60}/>
            </div>
            <div className="flex flex-col gap-2 self-center">
              <strong className="text-gray-400 font-bold text-3xl ">{sellerViews?.amount}</strong>
              <span className="text-gray-300 flex-wr text-xs">Pessoas <br/> visitantes</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl flex-1">
          <header>
            <strong>Visitantes</strong>
            <strong><Calendar className="text-blue-light"/> 25 DE JUNho - 25 DE Julho</strong>
          </header>
          <div>
            {viewsPerDay ? (
              <ResponsiveContainer width="100%" height={240}>
                <LineChart
                  style={{fontSize: 12}}
                  data={chartData}
                >
                <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
                <YAxis  
                  axisLine={false}
                  tickLine={false}
                  width={80}
                />
                <CartesianGrid
                  vertical={false}
                />
                <Line
                  type="monotone"
                  strokeWidth={2}
                  dataKey="amount"
                  stroke="#5EC5FD"
                  dot={false}
                />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[240px] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}