
import { api } from "@/lib/axios";
export interface CancelOrderParams {
  id: string;
  status: string
}

export async function changeProductStatus({ id, status }: CancelOrderParams) {
  await api.patch(`/products/${id}/${status}`);
}
