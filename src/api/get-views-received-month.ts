import { api } from "../lib/axios";

interface GetSellerViewsResponse {
  amount: number;
}

export async function getSellerViews() {
  const response = await api.get<GetSellerViewsResponse>(
    "/sellers/metrics/views",
  );
  return response.data;
}
