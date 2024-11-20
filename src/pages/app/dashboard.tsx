import { getProductsAvailable } from "@/api/get-products-available";
import { getProductsSold } from "@/api/get-products-sold";
import { getSellerViews } from "@/api/get-views-received-month";
import { getViewsPerDay } from "@/api/get-views-received-per-day";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import {
  BadgeDollarSign,
  Calendar,
  Loader2,
  Store,
  UsersRound,
} from "lucide-react";
import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  ResponsiveContainer,
  XAxis,
  LineChart,
  YAxis,
  Tooltip,
} from "recharts";

export interface GetViewsPerDayResponse {
  date: string;
  amount: number;
}

export function Dashboard() {
  const { data: productsSold, isLoading: isLoadingProductsSold } = useQuery({
    queryKey: ["productsSold"],
    queryFn: getProductsSold,
  });

  const { data: productsAvailable, isLoading: isLoadingProductsAvailable } = useQuery({
    queryKey: ["productsAvailable"],
    queryFn: getProductsAvailable,
  });

  const { data: sellerViews, isLoading: isLoadingSellerViews } = useQuery({
    queryKey: ["sellerViews"],
    queryFn: getSellerViews,
  });

  const { data: viewsPerDay, isLoading: isLoadingViewsPerDay } = useQuery({
    queryKey: ["viewsPerDay"],
    queryFn: () => getViewsPerDay(),
  });

  const firstDate = viewsPerDay?.viewsPerDay[0]?.date ?? new Date().toISOString();
  
  const formmattedFistdDate = format(firstDate, "dd 'de' MMMM", { locale: pt })



  const lastDate = viewsPerDay?.viewsPerDay[viewsPerDay.viewsPerDay.length - 1]?.date  ?? new Date().toISOString();

  const formmattedLastdDate = format(lastDate, "dd 'de' MMMM", { locale: pt })


  const chartData = useMemo(() => {
    return viewsPerDay?.viewsPerDay.map((chartItem) => {
      const date = new Date(chartItem.date);
      return {
        date: String(date.getDate()).padStart(2, "0"),
        amount: chartItem.amount,
      };
    });
  }, [viewsPerDay]);

  return (
    <div className="max-w-[1280px] m-auto ">
      <div className="my-10">
        <h1 className="text-gray-500 text-2xl font-bold">Últimos 30 dias</h1>
        <span className="text-gray-300 text-sm font-normal">
          Confira as estátisticas da sua loja no último mês
        </span>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 p-3 bg-white rounded-3xl min-w-60">
            <div className="bg-blue-light text-blue-dark rounded-xl p-4">
              <BadgeDollarSign width={60} height={60} />
            </div>
            <div className="flex flex-col gap-2 self-center">
              <strong className="text-gray-400 font-bold text-3xl ">
                {isLoadingProductsSold ? (<Skeleton className="w-12 h-9"/>) : (productsSold?.amount)}
              </strong>
              <span className="text-gray-300 flex-wr text-xs">
                produtos
                <br /> vendidos
              </span>
            </div>
          </div>

          <div className="flex gap-4 p-3 bg-white rounded-3xl min-w-fit ">
            <div className="bg-blue-light text-blue-dark rounded-xl p-4">
              <Store width={60} height={60} />
            </div>
            <div className="flex flex-col gap-2 self-center">
              <strong className="text-gray-400 font-bold text-3xl ">
              {isLoadingProductsAvailable ? (<Skeleton className="w-12 h-9"/>) : (productsAvailable?.amount)}
              </strong>
              <span className="text-gray-300 flex-wr text-xs">
                produtos <br /> anunciados
              </span>
            </div>
          </div>

          <div className="flex gap-4 p-3 bg-white rounded-3xl min-w-fit">
            <div className="bg-blue-light text-gray-300 rounded-xl p-4">
              <UsersRound width={60} height={60} />
            </div>
            <div className="flex flex-col gap-2 self-center">
              <strong className="text-gray-400 font-bold text-3xl ">
              {isLoadingSellerViews ? (<Skeleton className="w-12 h-9"/>) : (sellerViews?.amount)}
              </strong>
              <span className="text-gray-300 flex-wr text-xs">
                Pessoas <br /> visitantes
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl flex-1 p-6 flex flex-col gap-4">
          <header className="flex justify-between items-center">
            <strong>Visitantes</strong>
            {isLoadingViewsPerDay ? ( <Skeleton className="w-64 h-6"/> ) : (
            <strong className="flex items-center gap-2">
              <Calendar className="text-blue-dark w-4" />
              <span className="text-gray-200 text-xs uppercase font-medium">
                {formmattedFistdDate} - {formmattedLastdDate}
              </span>
              
            </strong>
          )}
            
          </header>
          <div className="">
            {isLoadingViewsPerDay ? (
                <div className="flex h-[240px] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={290}>
                <LineChart style={{ fontSize: 12 }} data={chartData}>
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    dy={16}
                  />
                  <YAxis axisLine={false} tickLine={false} width={25} />
                  <Tooltip />
                  <CartesianGrid vertical={false} />
                  <Line
                    type="monotone"
                    strokeWidth={2}
                    dataKey="amount"
                    stroke="#5EC5FD"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
