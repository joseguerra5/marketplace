import { api } from "../lib/axios";
export interface GetProductParams {
  productId: string;
}

export interface GetProductResponse {
  product: {
    id: string;
    title: string | null;
    description: string | null;
    priceInCents: number;
    status: "available" | "sold" | "cancelled";
    owner: {
      id: string;
      name: string | null;
      phone: string | null;
      email: string | null;
      avatar: {
        id: string | null;
        url: string | null;
      };
    };
    category: {
      id: string;
      title: string | null;
      slug: string | null;
    };
    attachments: {
      id: string;
      url: string | null;
    }[];
  };
}
export async function getProductById({ productId }: GetProductParams) {
  const response = await api.get<GetProductResponse>(`/products/${productId}`);
  return response.data;
}
