import { BadgeDollarSign, Search } from "lucide-react";

export function Products() {
  return (
    <div className="max-w-[1280px] m-auto ">
      <div className="my-10">
        <h1 className="text-gray-500 text-3xl font-bold">Seus produtos</h1>
        <span className="text-gray-300 text-sm font-light">Acesse e gerencie a sua lista de produtos á venda</span>  
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="sticky top-5 col-span-1 bg-white rounded-lg max-h-fit p-6" >
          <form action="" className="gap-5 flex flex-col">
            <label className="text-gray-300 text-xl font-bold">Filtrar</label>
            <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
              <Search className="text-gray-200"/>
              <input 
              type="text" placeholder="Pesquisar"
              className="bg-transparent text-gray-200
              outline-none w-full
              "
              />
            </div>
            <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
              <BadgeDollarSign className="text-gray-200"/>
              <input 
              type="text" placeholder="Digite seu e-mail"
              className="bg-transparent text-gray-200
              outline-none w-full
              "
              />
            </div>
            <button className="text-center flex rounded-lg bg-orange-base border-transparent text-white p-2 w-full">
              Aplicar filtro
            </button>
          </form>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div className=" bg-white rounded-xl p-1 max-w-fit max-h-fit">
            <div className="relative">
              <div className="absolute top-2 right-2 flex gap-2">
                <span className="rounded-full text-white px-3 bg-blue-dark ">anunciado</span>
                <span className="rounded-full text-white px-3 bg-gray-300">móvel</span>
              </div>
              <img src="../src/assets/product-image.png" className="rounded-xl w-full h-40 " alt="" />
            </div>
            <div className="text-gray-400 font-bold m-3">
              <span>Sofá</span>
              <span>€ 200,00</span>
            </div>
            <p className="text-gray-300 m-3 line-clamp-2">Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em metal cromado. Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em metal cromado. Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em metal cromado.Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em metal cromado. Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em metal cromado.</p>
          </div>

          <div className=" bg-white rounded-xl p-1 max-w-fit max-h-fit">
            <img src="../src/assets/product-image.png" className="rounded-xl w-full h-40" alt="" />
            <div className="text-gray-400 font-bold m-3">
              <span>Sofá</span>
              <span>€ 200,00</span>
            </div>
            <p className="text-gray-300 m-3">Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em metal cromado.</p>
          </div>

          <div className=" bg-white rounded-xl p-1 max-w-fit max-h-fit">
            <img src="../src/assets/product-image.png" className="rounded-xl w-full h-40" alt="" />
            <div className="text-gray-400 font-bold m-3">
              <span>Sofá</span>
              <span>€ 200,00</span>
            </div>
            <p className="text-gray-300 m-3">Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em metal cromado.</p>
          </div>

          <div className=" bg-white rounded-xl p-1 max-w-fit max-h-fit">
            <img src="../src/assets/product-image.png" className="rounded-xl w-full h-40" alt="" />
            <div className="text-gray-400 font-bold m-3">
              <span>Sofá</span>
              <span>€ 200,00</span>
            </div>
            <p className="text-gray-300 m-3">Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em metal cromado.</p>
          </div>

          <div className=" bg-white rounded-xl p-1 max-w-fit max-h-fit">
            <img src="../src/assets/product-image.png" className="rounded-xl w-full h-40" alt="" />
            <div className="text-gray-400 font-bold m-3">
              <span>Sofá</span>
              <span>€ 200,00</span>
            </div>
            <p className="text-gray-300 m-3">Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em metal cromado.</p>
          </div>

          <div className=" bg-white rounded-xl p-1 max-w-fit max-h-fit">
            <img src="../src/assets/product-image.png" className="rounded-xl w-full h-40" alt="" />
            <div className="text-gray-400 font-bold m-3">
              <span>Sofá</span>
              <span>€ 200,00</span>
            </div>
            <p className="text-gray-300 m-3">Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em metal cromado.</p>
          </div>

        </div>

      </div>
    </div>
  )
}