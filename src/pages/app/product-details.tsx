import { getProductById } from "@/api/get-product-by-id";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Ban, Check } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ProductStatus } from "./product-status";
import {  changeProductStatus } from "@/api/change-product-status";
import { GetProductsResponse } from "@/api/get-products";


export function ProductDetails() {
  const { id } = useParams()

  if (!id) {
    throw new Error("Product ID is required");
  }

  const productId: string = id
  
  const queryClient = useQueryClient()
  
  const {data: result} = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById({ productId })
  })

  function updateOrderStatusOnCache(id: string, status: ProductStatus) {
    const productListCache = queryClient.getQueriesData<GetProductsResponse>({
      queryKey: ["products"]
    })

    productListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        console.log("sem dados em cache")
        return
      }

      queryClient.setQueryData<GetProductsResponse>(cacheKey, {
        ...cacheData,
        products: cacheData.products.map((product) => {
          if (product.id === id) {
            return { ...product, status }
          }
          console.log("produto atualizado:",product)
          console.log(id)
          console.log(status)
          return product
        })
      })
    })
  }

  const {mutateAsync: cancelProductFn} = useMutation({
    mutationFn: changeProductStatus,
      async onSuccess(_, {id}) {
        updateOrderStatusOnCache(id, "cancelled")
      }

  })

  const {mutateAsync: soldProductFn} = useMutation({
    mutationFn: changeProductStatus,
      async onSuccess(_, {id}) {
        updateOrderStatusOnCache(id, "sold")
      }

  })

 
  
  

 


  return(
    <div className="flex flex-col gap-10 max-w-7xl m-auto">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 mt-8">
          <Link to="/products" className="text-orange-base flex hover:text-orange-dark"><ArrowLeft/> Voltar</Link>
          <h3 className="text-gray-500 text-3xl font-bold">Editar produto</h3>
          <span className="text-gray-300 text-sm font-light">Gerencie as informações do produto cadastrado</span>  
        </div>
        <div className="flex gap-2 items-end">
          <button className="text-orange-base flex gap-2 hover:text-orange-dark" type="button" onClick={() => soldProductFn({id: productId, status: "sold"})}><Check/> Marcar como vendido</button>
          <button className="text-orange-base flex gap-2 hover:text-orange-dark" type="button" onClick={() => cancelProductFn({id: productId, status: "cancelled"})}><Ban/> Desativar anúncio</button>
        </div>
      </div>
      
      
      <div className=" flex gap-6 ">
          <img src={result?.product.attachments[0].url ?? ""} alt="" className="rounded-2xl w-[415px] h-[340px]"/>

          <form action="" className="bg-white flex flex-col rounded-3xl p-8 flex-1 gap-6">
            <header className="flex justify-between items-center">
              <h3 className="text-gray-300 font-bold">Dados do produto</h3>
              <ProductStatus status={result?.product.status ?? "sold"}/>
            </header>
            <div className="flex flex-col gap-6">
              <div className="flex w-full gap-5">
                <div className="w-9/12 group focus-within:text-orange-base">
                  <label htmlFor="" className="text-gray-300 group-focus-within:text-orange-base text-xs font-medium" >TÍTULO</label>
                  <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
                    <input 
                    type="text" placeholder="Nome do produto"
                    className="bg-transparent placeholder-gray-200 text-gray-400
                    outline-none w-full 
                    "
                    value={result?.product.title ?? ""}
                    />
                  </div>
                </div>

                <div className="group focus-within:text-orange-base">
                  <label htmlFor="" className="text-gray-300 group-focus-within:text-orange-base text-xs font-medium">VALOR</label>
                  <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
                    <span className="text-gray-400 group-focus-within:text-orange-base">€</span> 
                    <input 
                    type="text" placeholder="0,00"
                    className="bg-transparent placeholder-gray-200 text-gray-400
                    outline-none w-full
                    "
                    value={(result?.product.priceInCents ?? 0)/100}
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
                  text-gray-400
                  caret-orange-base
                  outline-none w-full
                  "
                  value={result?.product.description ?? ""}
                  />
                </div>
              </div>

              <div>
                <select className="bg-transparent py-2 border-b-2 flex gap-2 w-full placeholder-gray-200 text-gray-400 ">

                  <option value={result?.product.category.slug ?? ""} selected>{result?.product.category.title ?? ""}</option>
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