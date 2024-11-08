import { ArrowLeft, Ban, Check } from "lucide-react";
import { Link } from "react-router-dom";


export function ProductDetails() {
  return(
    <div className="flex flex-col gap-10 max-w-7xl m-auto">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 mt-8">
          <Link to="/products" className="text-orange-base flex hover:text-orange-dark"><ArrowLeft/> Voltar</Link>
          <h3 className="text-gray-500 text-3xl font-bold">Editar produto</h3>
          <span className="text-gray-300 text-sm font-light">Gerencie as informações do produto cadastrado</span>  
        </div>
        <div className="flex gap-2 items-end">
          <button className="text-orange-base flex gap-2 hover:text-orange-dark"><Check/> Marcar como vendido</button>
          <button className="text-orange-base flex gap-2 hover:text-orange-dark"><Ban/> Desativar anúncio</button>
        </div>
      </div>
      
      
      <div className=" flex gap-6 ">
          <img src="../src/assets/product-detail-image.png" alt="" className="rounded-2xl w-[415px] h-[340px]"/>

          <form action="" className="bg-white flex flex-col rounded-3xl p-8 flex-1 gap-6">
            <header className="flex justify-between items-center">
              <h3 className="text-gray-300 font-bold">Dados do produto</h3>
              <span className="rounded-full text-white px-3 bg-blue-dark ">ANUNCIADO</span>
            </header>
            <div className="flex flex-col gap-6">
              <div className="flex w-full gap-5">
                <div className="w-9/12 group focus-within:text-orange-base">
                  <label htmlFor="" className="text-gray-300 group-focus-within:text-orange-base text-xs font-medium" >TÍTULO</label>
                  <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
                    <input 
                    type="text" placeholder="Nome do produto"
                    className="bg-transparent text-gray-200
                    outline-none w-full
                    "
                    />
                  </div>
                </div>

                <div className="group focus-within:text-orange-base">
                  <label htmlFor="" className="text-gray-300 group-focus-within:text-orange-base text-xs font-medium">VALOR</label>
                  <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
                    <span className="text-gray-400 group-focus-within:text-orange-base">€</span> 
                    <input 
                    type="text" placeholder="0,00"
                    className="bg-transparent text-gray-200
                    outline-none w-full
                    "
                    />
                  </div>
                </div>


              </div>

              <div className="group focus-within:text-orange-base mb-5">
                <label htmlFor="" className="text-gray-300 group-focus-within:text-orange-base text-xs font-medium">DESCRIÇÃO</label>
                <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
                  <textarea 
                   placeholder="Escreva detalhes sobre o produto, tamanho, características"
                  className="group bg-transparent placeholder-gray-200
                  text-gray-500
                  caret-orange-base
                  outline-none w-full
                  "
                  />
                </div>
              </div>

              <div>
                <select className="bg-transparent py-2 border-b-2 flex gap-2 w-full text-gray-200">
                  <option value="noValue" disabled selected>Selecione</option>
                  <option value="opcao1">Brinquedo</option>
                  <option value="opcao2">Móvel</option>
                  <option value="opcao3">Papelaria</option>
                  <option value="opcao3">Saúde & Beleza</option>
                  <option value="opcao3">Utensílio</option>
                  <option value="opcao3">Vestuário</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button className="rounded-lg border border-orange-base text-orange-base p-2 w-full hover:text-orange-dark hover:border-orange-dark">
                  Cancelar
                </button>
                <button className="rounded-lg border bg-orange-base text-white p-2 w-full hover:bg-orange-dark">
                  Salvar e publicar
                </button>
              </div>
            </div>
          </form>
      </div>
    </div>
  )
}