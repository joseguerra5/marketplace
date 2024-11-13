import { getProductById } from "@/api/get-product-by-id";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Ban, Check, CircleAlert, ImageUp } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductStatus } from "./product-status";
import {  changeProductStatus } from "@/api/change-product-status";
import { GetProductsResponse } from "@/api/get-products";
import { useEffect, useState } from "react";
import { z } from "zod";
import {Controller, useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";


const productForm = z.object({
  title: z.string(),
  categoryId: z.string(),
  description: z.string(),
  priceInCents: z.number(),
  attachmentsIds: z.custom<FileList>().refine((files) => {
    return Array.from(files ?? []).every((file) => ["image/png", "image/jpeg"].includes(file.type), {
      message: "O arquivo deve ser uma imagem PNG ou JPEG",
    })
  }),
})

type ProductForm = z.infer<typeof productForm>

export function ProductDetails() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  if (!id) {
    throw new Error("Product ID is required");
  }

  const productId: string = id

  const {data: result} = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById({ productId })
  })

  console.log(result)


  const { register, handleSubmit, control, clearErrors, setValue, reset, formState: {errors}} = useForm<ProductForm>({
    resolver: zodResolver(productForm),
    defaultValues: result? {
      categoryId: result?.product.category.id,
      description: result?.product.description ?? "",
      priceInCents: result?.product.priceInCents,
      title: result?.product.title ?? "",
    } : undefined,
  })

  console.log(result)

  const { id: attachmentId } = result?.product?.attachments?.[0] || {};

  useEffect(() => {
    if (result) {
      reset({
        categoryId: result.product.category.id,
        description: result.product.description ?? "",
        priceInCents: result.product.priceInCents,
        title: result.product.title ?? "",
      });
    }
  }, [result, reset, attachmentId]);


  if (!id) {
    throw new Error("Product ID is required");
  }

  
  
  const queryClient = useQueryClient()
  
  

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

  async function handleEditProduct(data: ProductForm) {
    console.log("submit")
    console.log(data)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // verifica se o evento de change tem um arquivo
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        // define o url da imagem para visualizar
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      const fileList = new DataTransfer();
      fileList.items.add(file);

      setValue("attachmentsIds", fileList.files);  // Array com o único arquivo selecionado
      clearErrors("attachmentsIds");
        }
      }


  return(
    <div className="flex flex-col gap-10 max-w-7xl m-auto">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 mt-8">
          <Link to="/products" className="text-orange-base flex hover:text-orange-dark"><ArrowLeft/> Voltar</Link>
          <h3 className="text-gray-500 text-3xl font-bold">Editar produto</h3>
          <span className="text-gray-300 text-sm font-light">Gerencie as informações do produto cadastrado</span>  
        </div>
        <div className="flex gap-2 items-end">
          {result?.product.status === "available" ? <button className="text-orange-base flex gap-2 hover:text-orange-dark" type="button" onClick={() => soldProductFn({id: productId, status: "sold"})}><Check/> Marcar como vendido</button> : <button className="text-orange-base flex gap-2 hover:text-orange-dark" type="button" onClick={() => soldProductFn({id: productId, status: "available"})}><Check/> Marcar como disponível</button>}
          <button className="text-orange-base flex gap-2 hover:text-orange-dark disabled:text-orange-base/60 disabled:cursor-not-allowed" type="button" disabled={result?.product.status === "sold"} onClick={() => cancelProductFn({id: productId, status: "cancelled"})}><Ban/> Desativar anúncio</button>
        </div>
      </div>
      
      
      <div className="  ">
        <form action="" className="flex gap-6" onSubmit={handleSubmit(handleEditProduct)}>
          <div className="rounded-xl bg-shape w-[415px] h-[340px]">
          {imagePreview ? ( 
            <label htmlFor="attachmentsIds" className="group w-full h-full  justify-center items-center flex overflow-hidden rounded-lg relative">
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 "></div>
                      <div className="absolute flex items-center flex-col z-10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ImageUp width={40} height={40}/>
                        <span className="text-sm">Selecione a imagem do produto</span>
                      </div>
                      <img src={imagePreview} alt="" className="w-full h-full object-cover" />
                      <input 
                        type="file" 
                        id="attachmentsIds" 
                        className="hidden"
                        {...register("attachmentsIds")}
                        onChange={handleImageChange}
                      />
                    
                    </label>
                ) : (
                <label htmlFor="attachmentsIds" className="group w-full h-full  justify-center items-center flex overflow-hidden rounded-lg relative">
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 "></div>
                <div className="absolute flex items-center flex-col z-10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ImageUp width={40} height={40}/>
                  <span className="text-sm">Selecione a imagem do produto</span>
                </div>
                <img src={result?.product.attachments[0].url ?? ""} alt="" className="w-full h-full object-cover" />
                <input 
                  type="file" 
                  id="attachmentsIds" 
                  className="hidden"
                  {...register("attachmentsIds")}
                  onChange={handleImageChange}
                />
              
              </label>
                  )}
                  {errors.attachmentsIds && <span className="flex  items-center  gap-2 text-danger  text-xs "><CircleAlert width={16}/>{errors.attachmentsIds.message}</span>}
            </div> 
          <div className="bg-white flex flex-col rounded-3xl p-8 flex-1 gap-6">
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
                    {...register("title")}
                    />
                  </div>
                  {errors.title && <span className="flex  items-center  gap-2 text-danger  text-xs "><CircleAlert width={16}/>{errors.title.message}</span>}
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
                    {...register("priceInCents", {valueAsNumber: true})}
                    />
                  </div>
                  {errors.priceInCents && <span className="flex  items-center  gap-2 text-danger  text-xs "><CircleAlert width={16}/>{errors.priceInCents.message}</span>}
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
                  {...register("description")}
                  />
                </div>
                {errors.description && <span className="flex  items-center  gap-2 text-danger  text-xs "><CircleAlert width={16}/>{errors.description.message}</span>}
              </div>
              <Controller
                name="categoryId"
                control={control}
                render={({field: {name, onChange, value, disabled}}) => {
                  return(
                    <div className="">
                      <label htmlFor="categoryId" className="text-gray-300 text-xs font-medium">CATEGORIA</label>
                      <div>
                        <select 
                          className="bg-transparent py-2 border-b-2 flex gap-2 w-full text-gray-200"
                          name={name}
                          onChange={onChange}
                          value={value}
                          disabled={disabled}
                          >                        
                          <option value="2f01b979-a025-477d-b564-1f5f3900dd07">Eletrônicos</option>
                          <option value="9b471a95-14d8-4f0b-8d31-23dc8a850852">Esportes</option>
                          <option value="fd681739-4168-407e-b9db-f0af953147b3">Livros</option>
                          <option value="f474976f-9b69-493e-996e-a7eb302ba1d1">Moda</option>
                          <option value="0b943bc2-26c5-4ab0-ad63-b3e9acb3a77e">Eletrodomésticos</option>
                          <option value="7f9423d0-3080-46a6-a2aa-d5bf3d4e58e2">Decoração</option>
                          <option value="0951c5f3-761e-4843-b9de-d4ca2de870af">Móveis</option>
                        </select>
                      </div>
                      {errors.categoryId && <span className="flex  items-center  gap-2 text-danger  text-xs "><CircleAlert width={16}/>{errors.categoryId.message}</span>}
                    </div>
                  )
                }}
              />

              <div className="flex gap-2">
                <button className="rounded-lg border border-orange-base text-orange-base p-2 w-full hover:text-orange-dark hover:border-orange-dark" type="button" onClick={() => navigate("/products")}>
                  Cancelar
                </button>
                <button className="rounded-lg border bg-orange-base text-white p-2 w-full hover:bg-orange-dark">
                  Salvar e publicar
                </button>
              </div>
            </div>
          </div>
          </form>
      </div>
    </div>
  )
}

