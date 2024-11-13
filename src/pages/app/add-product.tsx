import { CircleAlert, ImageUp } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import {Controller, useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { addProduct, productFileUpload } from "@/api/add-product";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

export function AddProduct() {
  const navigate = useNavigate()

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const { register, handleSubmit, control, clearErrors, setValue, formState: {isSubmitting, errors}} = useForm<ProductForm>({
    resolver: zodResolver(productForm),
  })


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

  async function handleAddProduct(data: ProductForm) {
    try {
      if (data.attachmentsIds?.length && data.attachmentsIds.length > 0) {
        const attachment = new FormData()
        attachment.append("files", data.attachmentsIds[0])
        const uploadedProductFile = await productFileUpload({
          attachment
        })

        

        const attachmentId = uploadedProductFile.attachments[0].id
        console.log("console do attachmentID:", attachmentId)

        const productResponse = await addProduct ({
          attachmentsIds: [attachmentId],
          categoryId: data.categoryId,
          description: data.description,
          priceInCents: data.priceInCents,
          title: data.title
        })
          toast.success("Produto cadastrado com sucesso", {
            action: {
              label: "Detalhe do produto",
              onClick: () => navigate(`/products/${productResponse.product.id}`),
            },
          })
        } else {
          console.log("attachmentsIds está vazio ou indefinido");
          console.log(data);
        }
        
    } catch (e)  {
      toast.error(`o erro foi ${e}`)
      console.log("data do arquivo",data)
      console.log(e)
      console.log("errou")
    }
  }
    
  return (
    <div className="flex flex-col gap-10 max-w-7xl m-auto">

      <div className="flex flex-col gap-2 mt-8">
        <h3 className="text-gray-500 text-2xl font-bold">Novo produto</h3>
        <span className="text-gray-300 text-sm font-normal">Cadastre um produto para venda no marketplace</span>  
      </div>
      
        <form className="flex gap-6" onSubmit={handleSubmit(handleAddProduct)}> 
        
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
                <label htmlFor="attachmentsIds" className="w-full h-full  justify-center items-center flex flex-col">
                    <ImageUp className="text-orange-base" width={40} height={40}/>
                    <input 
                      type="file" 
                      id="attachmentsIds" 
                      className="hidden"
                      {...register("attachmentsIds")}
                      onChange={handleImageChange}
                    />
                    <span className="text-sm text-gray-300">Selecione a imagem do produto</span>
                  </label>
                  )}
                  {errors.attachmentsIds && <span className="flex  items-center  gap-2 text-danger  text-xs "><CircleAlert width={16}/>{errors.attachmentsIds.message}</span>}
            </div>          

            <div className="bg-white flex flex-col rounded-3xl p-8 flex-1 gap-6">
              
              <h3 className="text-gray-300 font-bold">Dados do produto</h3>

              <div className="flex w-full gap-5">

                <div className="group focus-within:text-orange-base w-9/12">
                  <label htmlFor="" className="text-gray-300 group-focus-within:text-orange-base text-xs font-medium">TÍTULO</label>
                  <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
                    <input 
                    type="text" 
                    placeholder="Nome do produto"
                    className="group bg-transparent placeholder-gray-200
                    text-gray-500
                    caret-orange-base
                    outline-none w-full
                    "
                    {...register("title")}
                    />
                  </div>
                  {errors.title && <span className="flex  items-center  gap-2 text-danger  text-xs "><CircleAlert width={16}/>{errors.title.message}</span>}
                </div>

                <div className="group focus-within:text-orange-base">
                  <label htmlFor="priceInCents" className="text-gray-300 group-focus-within:text-orange-base text-xs font-medium">VALOR</label>
                  <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
                    <span className="text-gray-200 group-focus-within:text-orange-base">€</span> 
                    <input 
                    type="number" 
                    placeholder="0,00"
                    id="priceInCents"
                    className="group bg-transparent placeholder-gray-200
                    text-gray-500
                    caret-orange-base
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
                  text-gray-500
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
                        <option value="noValue" disabled selected>Selecione</option>
                        <option value="2f01b979-a025-477d-b564-1f5f3900dd07">Eletrônicos</option>
                        <option value="9b471a95-14d8-4f0b-8d31-23dc8a850852">Esportes</option>
                        <option value="fd681739-4168-407e-b9db-f0af953147b3">Livros</option>
                        <option value="f474976f-9b69-493e-996e-a7eb302ba1d1">Moda</option>
                        <option value="0b943bc2-26c5-4ab0-ad63-b3e9acb3a77e">Eletrodomésticos</option>
                        <option value="7f9423d0-3080-46a6-a2aa-d5bf3d4e58e2">Decoração</option>
                        <option value="0951c5f3-761e-4843-b9de-d4ca2de870af">Móveis</option>
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
                <button className="rounded-lg bg-orange-base border-transparent hover:bg-orange-dark text-white p-2 w-full" disabled={isSubmitting}>
                  Salvar e publicar
                </button>
              </div>

            </div>

        </form>
        </div>  
  )
}
