import { getProductById } from "@/api/get-product-by-id";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, CircleAlert, ImageUp, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductStatus } from "./product-status";

import { useEffect, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { getCategories } from "@/api/get-list-categories";
import { productFileUpload } from "@/api/add-product";
import { editProductById } from "@/api/put-product-by-id";
import { Skeleton } from "@/components/ui/skeleton";
import { ChangeProductStatus } from "./change-product-status";

const productForm = z.object({
  title: z.string(),
  categoryId: z.string(),
  description: z.string(),
  priceInCents: z.number(),
  attachmentsIds: z.custom<FileList | string[]>().refine((files) => {
    if (files instanceof FileList) {
      return Array.from(files ?? []).every(
        (file) => ["image/png", "image/jpeg"].includes(file.type),
        {
          message: "O arquivo deve ser uma imagem PNG ou JPEG",
        },
      );
    } else if (Array.isArray(files)) {
      return files.every((id) => typeof id === "string" && id.trim() !== "");
    }
    return false;
  }),
});

type ProductForm = z.infer<typeof productForm>;

export function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  if (!id) {
    throw new Error("Product ID is required");
  }

  const productId: string = id;

  const { data: result, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById({ productId }),
  });

  const [imagePreview, setImagePreview] = useState<string[] | string | null>(
    result?.product.attachments?.[0]?.url
      ? [result.product.attachments[0].url]
      : null,
  );

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  function formatCurrencyNumber(currency: number) {
    const numericValue = parseFloat(currency.toString().replace(/\D/g, '')) / 100 || 0;
  
    return parseFloat(numericValue.toFixed(2));
  }

  const priceformated = formatCurrencyNumber(result?.product.priceInCents ?? 0)

  const [currency, setCurrency] = useState<number>(priceformated);

  function formatCurrency(event: React.ChangeEvent<HTMLInputElement>) {
    let inputValue = event.target.value

    inputValue = inputValue.replace(/\D/g, '')
    
    let numericValue = parseFloat(inputValue.toString().replace(/\D/g, '')) / 100;
    
    if (Number.isNaN(numericValue)) {
      numericValue = 0
    }
    
    setCurrency(numericValue)
  }

  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productForm),
  });

  useEffect(() => {
    if (result) {
      reset({
        categoryId: result.product.category.id,
        description: result.product.description ?? "",
        priceInCents: priceformated,
        title: result.product.title ?? "",
        attachmentsIds: [result.product.attachments[0].id],
      });
    }
  }, [result, reset, priceformated]);

  const queryClient = useQueryClient();


  async function handleEditProduct(data: ProductForm) {
    try {
      if (data.attachmentsIds instanceof FileList) {
        const attachment = new FormData();
        attachment.append("files", data.attachmentsIds[0]);
        const uploadedProductFile = await productFileUpload({
          attachment,
        });

        const attachmentIdUploaded = [uploadedProductFile.attachments[0].id];

        await editProductById({
          attachmentsIds: attachmentIdUploaded,
          categoryId: data.categoryId,
          description: data.description,
          priceInCents: data.priceInCents,
          productId: productId,
          title: data.title,
        });
      } else if (Array(data.attachmentsIds)) {
        await editProductById({
          attachmentsIds: data.attachmentsIds,
          categoryId: data.categoryId,
          description: data.description,
          priceInCents: data.priceInCents,
          productId: productId,
          title: data.title,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
      toast.success("Produto alterado com sucesso!");
    } catch {
      toast.error("Algo de errado aconteceu, tente novamente mais tarde");
    }
  }

  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // verifica se o evento de change tem um arquivo
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // define o url da imagem para visualizar
        setImagePreview([reader.result as string]);
      };
      reader.readAsDataURL(file);

      const fileList = new DataTransfer();
      fileList.items.add(file);

      setValue("attachmentsIds", fileList.files); // Array com o único arquivo selecionado
      clearErrors("attachmentsIds");
    }
  };

  return (
    <div className="flex flex-col gap-10 max-w-7xl m-auto">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 mt-8">
          <button
            onClick={() => navigate(-1)}
            className="text-orange-base flex hover:text-orange-dark"
          >
            <ArrowLeft /> Voltar
          </button>
          <h3 className="text-gray-500 text-3xl font-bold">Editar produto</h3>
          <span className="text-gray-300 text-sm font-light">
            Gerencie as informações do produto cadastrado
          </span>
        </div>
        <div className="flex gap-2 items-end">
         <ChangeProductStatus status={result?.product.status} productId={productId}/>
        </div>
      </div>

      <div className="  ">
        <form
          action=""
          className="flex gap-6"
          onSubmit={handleSubmit(handleEditProduct)}
        >
          <div className="rounded-xl bg-shape w-[415px] h-[340px] flex items-center justify-center">
            {isLoadingProduct ? (
              <Loader2 className="animate-spin self-center"/>
            ) : (
              <label
                  htmlFor="attachmentsIds"
                  className="group w-full h-full  justify-center items-center flex overflow-hidden rounded-lg relative"
                >
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 "></div>
                  <div className="absolute flex items-center flex-col z-10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ImageUp width={40} height={40} />
                    <span className="text-sm">Selecione a imagem do produto</span>
                  </div>
                  <img
                    src={   imagePreview 
                      ? imagePreview 
                      : Array.isArray(result?.product.attachments[0].url)
                      ? result?.product.attachments[0].url[0] 
                      : result?.product.attachments[0].url ?? ''}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <input
                    type="file"
                    id="attachmentsIds"
                    className="hidden"
                    {...register("attachmentsIds")}
                    onChange={handleImageChange}
                  />
                </label>
            )}

            {errors.attachmentsIds && (
              <span className="flex  items-center  gap-2 text-danger  text-xs ">
                <CircleAlert width={16} />
                {errors.attachmentsIds.message}
              </span>
            )}
          </div>
          <div className="bg-white flex flex-col rounded-3xl p-8 flex-1 gap-6">
            <header className="flex justify-between items-center">
              <h3 className="text-gray-300 font-bold">Dados do produto</h3>
              {isLoadingProduct ? (<Skeleton className="w-20 h-4 rounded-full"/>) : (<ProductStatus status={result?.product.status ?? "sold"} />)}
              
            </header>
            <div className="flex flex-col gap-6">
              <div className="flex w-full gap-5">
                <div className="w-9/12 group focus-within:text-orange-base">
                  <label
                    htmlFor="title"
                    className="text-gray-300 group-focus-within:text-orange-base text-xs font-medium"
                  >
                    TÍTULO
                  </label>
                  <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
                    <input
                      type="text"
                      placeholder="Nome do produto"
                      id="title"
                      className="bg-transparent placeholder-gray-200 text-gray-400
                    outline-none w-full 
                    "
                      {...register("title")}
                    />
                  </div>
                  {errors.title && (
                    <span className="flex  items-center  gap-2 text-danger  text-xs ">
                      <CircleAlert width={16} />
                      {errors.title.message}
                    </span>
                  )}
                </div>

                <div className="group focus-within:text-orange-base">
                  <label
                    htmlFor="priceInCents"
                    className="text-gray-300 group-focus-within:text-orange-base text-xs font-medium"
                  >
                    VALOR
                  </label>
                  <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
                    <span className="text-gray-400 group-focus-within:text-orange-base">
                      €
                    </span>
                    <input
                      type="text"
                      id="priceInCents"
                      placeholder="0,00"
                      value={currency}
                      className="bg-transparent placeholder-gray-200 text-gray-400
                      outline-none w-full"
                      {...register("priceInCents", { valueAsNumber: true })}
                      onChange={formatCurrency}
                    />
                  </div>
                  {errors.priceInCents && (
                    <span className="flex  items-center  gap-2 text-danger  text-xs ">
                      <CircleAlert width={16} />
                      {errors.priceInCents.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="group focus-within:text-orange-base mb-5">
                <label
                  htmlFor="description"
                  className="text-gray-300 group-focus-within:text-orange-base text-xs font-medium"
                >
                  DESCRIÇÃO
                </label>
                <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
                  <textarea
                    placeholder="Escreva detalhes sobre o produto, tamanho, características"
                    className="group bg-transparent placeholder-gray-200
                  text-gray-400
                  caret-orange-base
                  outline-none w-full
                  "
                  id="description"
                    {...register("description")}
                  />
                </div>
                {errors.description && (
                  <span className="flex  items-center  gap-2 text-danger  text-xs ">
                    <CircleAlert width={16} />
                    {errors.description.message}
                  </span>
                )}
              </div>
              <Controller
                name="categoryId"
                control={control}
                render={({ field: { name, onChange, value, disabled } }) => {
                  return (
                    <div className="">
                      <label
                        htmlFor="categoryId"
                        className="text-gray-300 text-xs font-medium"
                      >
                        CATEGORIA
                      </label>
                      <div>
                        <select
                          className="bg-transparent py-2 border-b-2 flex gap-2 w-full text-gray-200"
                          name={name}
                          onChange={onChange}
                          id="categoryId"
                          value={value}
                          disabled={disabled}
                          defaultValue={result?.product.category.id}
                        >
                          {categories &&
                            categories.categories.map((categorie) => {
                              return (
                                <option value={categorie.id} key={categorie.id}>
                                  {categorie.slug}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      {errors.categoryId && (
                        <span className="flex  items-center  gap-2 text-danger  text-xs ">
                          <CircleAlert width={16} />
                          {errors.categoryId.message}
                        </span>
                      )}
                    </div>
                  );
                }}
              />

              <div className="flex gap-2">           
                <button
                  className="rounded-lg border border-orange-base text-orange-base p-2 w-full hover:text-orange-dark hover:border-orange-dark"
                  type="button"
                  onClick={() => navigate(-1)}
                >
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
  );
}
