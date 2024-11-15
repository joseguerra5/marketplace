import { api } from "../lib/axios";
export interface GetOrdersQuery {
  search?: string | null;
  status?: string | null;
}

export interface GetProductsResponse {
  products: {
    id: string;
    title: string | null;
    description: string | null;
    priceInCents: 1;
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
  }[];
}
export async function getProducts({ status, search }: GetOrdersQuery) {
  const response = await api.get<GetProductsResponse>(`/products/me`, {
    params: { status, search },
  });
  return response.data;
}
