import { getProducts } from "@/api/get-products";
import {  useQuery } from "@tanstack/react-query";
import { BadgeDollarSign, Search, X } from "lucide-react";
import { ProductLink } from "./product-link";
import { useSearchParams } from "react-router-dom";
import {useForm, Controller} from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const productFilterSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional()
})

type ProductFilterSchema = z.infer<typeof productFilterSchema>

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams()



  const status = searchParams.get("status")
  const search = searchParams.get("search")

  const {register, handleSubmit, control, reset} = useForm<ProductFilterSchema>({
    resolver: zodResolver(productFilterSchema),
    defaultValues: {
      status: status ?? "",
      search: search ?? ""
    }
  })

  function handleClearFilterStatus() {
    setSearchParams((state) => {
      state.delete("status")
      return state
    })
    reset({
      status: ""
    })
  }

  function handleFilter({status, search}: ProductFilterSchema){
    setSearchParams((state) => {
      if (search) {
        state.set("search", search)
      } else {
        state.delete("search")
      }

      if (status) {
        state.set("status", status)
      } else {
        state.delete("status")
      }

      return state
    })
  }

  const {data: result} = useQuery({
    queryKey: ["products", status, search],
    queryFn: () => getProducts({status, search})
  })

  
  return (
    <div className="max-w-5xl m-auto ">
      <div className="my-10">
        <h1 className="text-gray-500 text-2xl font-bold">Seus produtos</h1>
        <span className="text-gray-300 text-sm font-light">Acesse e gerencie a sua lista de produtos á venda</span>  
      </div>
      <div className="grid grid-cols-3 gap-6">
          <form action="" onSubmit={handleSubmit(handleFilter)} className="gap-5 flex flex-col sticky top-5 col-span-1 bg-white rounded-lg p-6 h-fit">
            <label className="text-gray-300 text-xl font-bold">Filtrar</label>
            <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full group focus-within:text-orange-base">
              <Search className="text-gray-200 group-focus-within:text-orange-base"/>
              <input 
              type="text" placeholder="Pesquisar"
              className="group bg-transparent placeholder-gray-200
              text-gray-500
              caret-orange-base
              outline-none w-full
              "
              {...register("search")}
              />
            </div>

            <Controller
              name="status"
              control={control}
              render={({field: {name, onChange, value, disabled}}) => {
                return(
                  <div className="group flex items-center focus-within:text-orange-base">
                    <BadgeDollarSign className="text-gray-200 group-focus-within:text-orange-base"/>
                    <select 
                      name={name}
                      onChange={onChange}
                      value={value}
                      disabled={disabled}
                      className="text-gray-200  bg-transparent py-2 border-b-2 flex items-center gap-2 w-full ">
                          <option value="" disabled selected>Status</option>
                          <option value="available">Anunciado</option>
                          <option value="sold">Vendido</option>
                          <option value="cancelled">Cancelado</option>
                    </select>
                    <button className="bg-shape rounded-full aspect-square p-1 flex items-center" type="button" onClick={handleClearFilterStatus}>
                      <X width={15} height={15}/>
                    </button>
                  </div>
                )
              }}
            />

            <button className="text-center rounded-lg bg-orange-base hover:bg-orange-dark border-transparent text-white p-2 w-full">
              Aplicar filtro
            </button>
          </form>
        <div className="col-span-2 grid grid-cols-2 gap-4">

          {result && 
            result.products.map((product) => {
              return <ProductLink key={product.id} products={product}/>
            })}

        </div>

      </div>
    </div>
  )
}