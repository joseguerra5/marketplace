import { BadgeDollarSign, Calendar, Store, UsersRound } from "lucide-react";

export function Dashboard() {
  return (
    <div className="max-w-[1280px] m-auto ">
      <div className="my-10">
        <h1 className="text-gray-500 text-3xl font-bold">Últimos 30 dias</h1>
        <span className="text-gray-300 text-sm font-light">Confira as estátisticas da sua loja no último mês</span>  
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 p-3 bg-white rounded-3xl min-w-fit">
            <div className="bg-blue-light text-blue-dark rounded-xl p-4">
              <BadgeDollarSign  width={60} height={60}/>
            </div>
            <div className="flex flex-col gap-2 self-center">
              <strong className="text-gray-400 font-bold text-3xl ">24</strong>
              <span className="text-gray-300 flex-wr">produtos vendidos</span>
            </div>
          </div>

          <div className="flex gap-4 p-3 bg-white rounded-3xl min-w-fit ">
            <div className="bg-blue-light text-blue-dark rounded-xl p-4">
              <Store  width={60} height={60}/>
            </div>
            <div className="flex flex-col gap-2 self-center">
              <strong className="text-gray-400 font-bold text-3xl ">56</strong>
              <span className="text-gray-300 flex-wr">produtos anunciados</span>
            </div>
          </div>

          <div className="flex gap-4 p-3 bg-white rounded-3xl min-w-fit">
            <div className="bg-blue-light text-gray-300 rounded-xl p-4">
              <UsersRound width={60} height={60}/>
            </div>
            <div className="flex flex-col gap-2 self-center">
              <strong className="text-gray-400 font-bold text-3xl ">2400</strong>
              <span className="text-gray-300 flex-wr">Pessoas visitantes</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl flex-1">
          <header>
            <strong>Visitantes</strong>
            <strong><Calendar className="text-blue-light"/> 25 DE JUNho - 25 DE Julho</strong>
          </header>
          <div></div>
        </div>
      </div>
    </div>
  )
}