import { api } from "../lib/axios"

export interface AddProductBody {
  title: string,
  categoryId: string,
  description: string,
  priceInCents: number,
  attachmentsIds: string[]
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
    status: "available",
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
    const response = await api.post<UploadProductResponse>(`/products`, 
    {attachmentsIds, categoryId, description, priceInCents, title} )
    return response.data
}

export async function productFileUpload({ 
  attachment 
}: AddProductImage): Promise<AddProductImageResponse> {
  const response = await api.post<AddProductImageResponse>("/attachments", 
    attachment,
  )
  return response.data
}