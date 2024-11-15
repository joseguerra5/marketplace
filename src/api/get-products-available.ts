import { api } from "../lib/axios";

interface GetProductsAvailableResponse {
  amount: number;
}

export async function getProductsAvailable() {
  const response = await api.get<GetProductsAvailableResponse>(
    "/sellers/metrics/products/available",
  );
  return response.data;
}
