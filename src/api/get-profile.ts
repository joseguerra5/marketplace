import { api } from "../lib/axios"

interface GetProfileResponse {
    seller: {
    id: string,
    name: string,
    phone: string,
    email: string,
    avatar: {
      id: string,
      url: string
    } | null,
  }
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>("/sellers/me")
  return response.data
}