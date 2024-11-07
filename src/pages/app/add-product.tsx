import { ImageUp } from "lucide-react";

export function AddProduct() {
  return (
    <div className="flex flex-col gap-10 max-w-7xl m-auto">
        <div className="flex flex-col gap-2 mt-8">
          <h3 className="text-gray-500 text-2xl font-bold">Novo produto</h3>
          <span className="text-gray-300 text-sm font-normal">Cadastre um produto para venda no marketplace</span>  
        </div>
      
      <div className=" flex gap-6 ">

          <div className="rounded-2xl w-[415px] h-[340px] bg-shape size-fit">
            <label htmlFor="avatar" className="w-full h-full  justify-center items-center flex flex-col p-11">
              <ImageUp className="text-orange-base" width={40} height={40}/>
              <input type="file" name="avatar" id="avatar" className="hidden"/>
              <span className="text-sm text-gray-300">Selecione a imagem do produto</span>
            </label>
          </div>

          <form action="" className="bg-white flex flex-col rounded-3xl p-8 flex-1 gap-6">
            <header className="flex justify-between items-center">
              <h3 className="text-gray-300 font-bold">Dados do produto</h3>
            </header>
            <div className="flex flex-col gap-6">
              <div className="flex w-full gap-5">
                <div className="group focus-within:text-orange-base w-9/12">
                  <label htmlFor="" className="text-gray-300 group-focus-within:text-orange-base text-xs font-medium">TÍTULO</label>
                  <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
                    <input 
                    type="text" placeholder="Nome do produto"
                    className="group bg-transparent placeholder-gray-200
                    text-gray-500
                    caret-orange-base
                    outline-none w-full
                    "
                    />
                  </div>
                </div>

                <div className="group focus-within:text-orange-base">
                  <label htmlFor="" className="text-gray-300 group-focus-within:text-orange-base text-xs font-medium">VALOR</label>
                  <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
                    <span className="text-gray-200 group-focus-within:text-orange-base">€</span> 
                    <input 
                    type="text" placeholder="0,00"
                    className="group bg-transparent placeholder-gray-200
                    text-gray-500
                    caret-orange-base
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

              <div className="">
                <label htmlFor="" className="text-gray-300 text-xs font-medium">CATEGORIA</label>

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
              </div>

              <div className="flex gap-2">
                <button className="rounded-lg border border-orange-base text-orange-base p-2 w-full hover:text-orange-dark hover:border-orange-dark">
                  Cancelar
                </button>
                <button className="rounded-lg bg-orange-base border-transparent hover:bg-orange-dark text-white p-2 w-full">
                  Salvar e publicar
                </button>
              </div>
            </div>
          </form>
      </div>
    </div>
  )
}