import { api } from "../lib/axios"

export interface AddProductBody {
  title: string,
  categoryId: string,
  description: string,
  priceInCents: number,
  attachmentsIds: string[] | null
}

export interface AddProductImage {
  attachment: FormData
}

export interface AddProductImageResponse {
  attachments: 
    {
      id: string,
      url: string
    }[]
}

interface UploadProductResponse {
  product: {
    id: string,
    title: string,
    description: string,
    priceInCents: number,
    status: string,
    owner: {
      id: string,
      name: string,
      phone: string,
      email: string,
      avatar: {
        id: string,
        url: string
      }
    },
    category: {
      id: string,
      title: string,
      slug: string
    },
    attachments: 
      {
        id: string,
        url: string
      }[]
  }
 }

export async function addProduct({
  attachmentsIds, categoryId, description, priceInCents, title
}: AddProductBody) {
    console.log(attachmentsIds, categoryId, description, priceInCents, title)
    const response = await api.post<UploadProductResponse>(`/products`, 
    {attachmentsIds, categoryId, description, priceInCents, title} )
    console.log("data do arquivoaaa",response)
    return response.data
}

export async function productFileUpload({ 
  attachment 
}: AddProductImage): Promise<AddProductImageResponse> {
  const attachments = await api.post<AddProductImageResponse>("/attachments", 
    attachment,
  )
  return attachments.data
}