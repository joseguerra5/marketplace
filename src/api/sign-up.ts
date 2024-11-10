import { api } from "../lib/axios"

export interface SignUpBody {
  email: string,
  password: string,
  passwordConfirmation: string,
  avatarId: string
  name: string,
  phone: string
}

export interface SignUpBodyImage {
  avatars: FormData
}

export interface SignUpImageResponse {
  attachments: 
    {
      "id": string,
      "url": string
    }[]
}

interface UploadImageResponse {
  id: string,
  name: string
  phone: string,
  email: string,
  avatar: {
    id: string
    url: string
  }[]
 }

export async function signUp({
  email, password, passwordConfirmation, avatarId, name, phone
}: SignUpBody) {
    const response = await api.post<UploadImageResponse>(`/sellers`, 
    {email, password, passwordConfirmation, name, phone, avatarId} )
    return response.data
}

export async function signUpFileUpload({ 
  avatars 
}: SignUpBodyImage): Promise<SignUpImageResponse> {
  console.log(avatars)
  const attachments = await api.post<SignUpImageResponse>("/attachments", 
    avatars,
  )
  console.log(attachments.data)
  return attachments.data
}