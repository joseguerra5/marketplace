import { api } from "../lib/axios"
export interface PutProductBody 
  {
    title: string,
    categoryId: string,
    description: string,
    priceInCents: number,
    attachmentsIds: (string | null)[];
  }


export interface PutProductResponse {
  product: 
    {
      id: string,
      title: string | null,
      description: string | null,
      priceInCents: number,
      status: "available" | "sold" | "cancelled",
      owner: {
        id: string,
        name: string | null,
        phone: string | null,
        email: string | null,
        avatar: {
          id: string | null,
          url: string | null
        }
      },
      category: {
        id: string,
        title: string | null,
        slug: string | null
      },
      attachments: 
        {
          id: string,
          url: string | null
        }[];
    };
}
export async function getProductById({
  attachmentsIds,
  categoryId,
  description,
  priceInCents,
  title,
  productId,
}: PutProductBody & { productId: string }) {
  const response = await api.put<PutProductResponse>(`/products/${productId}`, {
    attachmentsIds,
    categoryId,
    description,
    priceInCents,
    title
  })
  return response.data
}