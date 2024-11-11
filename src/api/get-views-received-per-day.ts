import { api } from "../lib/axios"

export type GetViewsPerDay = {
  viewsPerDay:{
    date: string,
    amount: number
  }[]
}

export async function getViewsPerDay() {
  const response = await api.get<GetViewsPerDay>("/sellers/metrics/views/days")
  return response.data
}