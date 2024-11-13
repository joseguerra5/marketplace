import { ArrowRight, CircleAlert, Eye, ImageUp, KeyRound, Mail, Phone, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp, signUpFileUpload } from "../../api/sign-up";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const signUpForm = z.object({
  email: z.string().email({message: "Insira um email válido"}),
  password: z.string(),
  passwordConfirmation: z.string(),
  avatar: z.custom<FileList>().refine((files) => {
    return Array.from(files ?? []).every((file) => ["image/png", "image/jpeg"].includes(file.type), {
      message: "O arquivo deve ser uma imagem PNG ou JPEG",
    })
  }),
  name: z.string(),
  phone: z.string().min(8, {message: "Insira um número válido"})
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()
  const [inputType, setInputType] = useState("password")

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // verifica se o evento de change tem um arquivo
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        // define o url da imagem para visualizar
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleShowPassword = () => setInputType("text")
  const handleHidePassword = () => setInputType("password")

  const { register, handleSubmit, formState: {isSubmitting, errors}} = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm)
  })

  const { mutateAsync: registerSeller } = useMutation({
    mutationFn: signUp,
  })

  const { mutateAsync: uploadImageFn } = useMutation({
    mutationFn: signUpFileUpload,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      console.log(data)
      if (data.avatar?.length && data.avatar.length > 0){
        const avatars = new FormData()
        avatars.append("files", data.avatar[0])
        const uploadedSignUpFile = await uploadImageFn({
          avatars
        })
        
        console.log("Resposta da API:", uploadedSignUpFile);

        const avatarId = uploadedSignUpFile.attachments[0].id

        await registerSeller ({
          email: data.email, 
          password: data.password, 
          avatarId,
          passwordConfirmation: data.passwordConfirmation, 
          name: data.name, 
          phone: data.phone})
      
          toast.success("Usuário cadastrado com sucesso", {
            action: {
              label: "Login",
              onClick: () => navigate(`/sign-in?email=${data.email}`),
            },
          })
        }


      
    } catch (e)  {
      toast.error(`o erro foi ${e}`)
      //console.log(data)
      //console.log("errou")
    }
  }

  return (
    <div className="rounded-3xl bg-white overflow-auto max-h-[90dvh] p-20 m-6 flex flex-col gap-10">
        <header className="flex flex-col gap-2">
          <h2 className="text-gray-500 font-bold text-2xl">Crie sua conta</h2>
          <span className="text-gray-300 text-sm">Informe os seus dados pessoais e de acesso</span>
        </header>

        <form action="" className="flex flex-col gap-5" onSubmit={handleSubmit(handleSignUp)}>
          <h2 className="text-gray-500 font-bold text-lg ">Perfil</h2>
          <div className="rounded-lg bg-shape size-fit w-20 h-20">

            {imagePreview ? ( 
                 <label htmlFor="avatarId" className="group w-full h-full  justify-center items-center flex overflow-hidden rounded-lg relative">
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 "></div>
                  <ImageUp className="absolute z-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" width={32}/>
                  <img src={imagePreview} alt="" className="w-full h-full object-cover" />
                  <input type="file" 
                  id="avatarId" 
                  className="hidden"
                  {...register("avatar")}
                  onChange={handleImageChange}
                  />
                  

                </label>
            ) : (
                  <label htmlFor="avatarId" className="group w-full h-full  justify-center items-center flex relative">
                    <ImageUp className="text-orange-base absolute group-hover:text-orange-dark" width={24}/>
                    <input type="file" 
                    id="avatarId" 
                    className="hidden"
                    {...register("avatar")}
                    onChange={handleImageChange}
                    />
                  </label>
                )}

            
            {errors.avatar && <span className="flex  items-center  gap-2 text-danger  text-xs "><CircleAlert width={16}/>{errors.avatar.message}</span>}
          </div>

          <div className="group focus-within:text-orange-base">
            <label htmlFor="userName" className="text-gray-300 group-focus-within:text-orange-base text-xs">NOME</label>
            <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
              <UserRound className="text-gray-200 group-focus-within:text-orange-base"/>
              <input 
              type="text" placeholder="Seu nome completo"
              className="group bg-transparent placeholder-gray-200
              text-gray-500
              caret-orange-base
              outline-none w-full
              "
              id="name"
              {...register("name")}
              />
            </div>
            {errors.name  && <span className="flex  items-center  gap-2 text-danger  text-xs "><CircleAlert width={16}/>{errors.name .message}</span>}
          </div>

          <div className="group focus-within:text-orange-base mb-12">
            <label htmlFor="phone" className="text-gray-300 group-focus-within:text-orange-base text-xs">TELEFONE</label>
            <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
              <Phone className="text-gray-200 group-focus-within:text-orange-base"/>
              <input 
              type="text" placeholder="000 000 000"
              className="bg-transparent text-gray-200
              outline-none w-full
              "
              id="phone"
              {...register("phone")}
              />
            </div>

            {errors.phone  && <span className="flex  items-center  gap-2 text-danger  text-xs "><CircleAlert width={16}/>{errors.phone .message}</span>}
          </div>

          <h2 className="text-gray-500 font-bold text-lg ">Acesso</h2>

          <div className="group focus-within:text-orange-base">
            <label htmlFor="email" className="text-gray-300 group-focus-within:text-orange-base text-xs">E-MAIL</label>
            <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
              <Mail className="text-gray-200 group-focus-within:text-orange-base"/>
              <input 
              type="text" placeholder="Digite seu e-mail de acesso"
              className="bg-transparent text-gray-200
              outline-none w-full
              "
              id="email"
              {...register("email")}
              />
            </div>
            {errors.email  && <span className="flex  items-center  gap-2 text-danger  text-xs "><CircleAlert width={16}/>{errors.email .message}</span>}
          </div>

          <div className="group focus-within:text-orange-base">
            <label htmlFor="password" className="text-gray-300 group-focus-within:text-orange-base text-xs">SENHA</label>
            <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
              <KeyRound className="text-gray-200 group-focus-within:text-orange-base"/>
              <input 
              type={inputType} placeholder="Senha de acesso"
              className="bg-transparent text-gray-200
              outline-none w-full
              "
              id="password"
              {...register("password")}
              />
              <button
                onMouseDown={handleShowPassword} 
                onMouseUp={handleHidePassword}
                onMouseLeave={handleHidePassword}
                type="button"
              >
                <Eye className="text-gray-200"/>
              </button>
            </div>
            {errors.password  && <span className="flex  items-center  gap-2 text-danger  text-xs "><CircleAlert width={16}/>{errors.password .message}</span>}
          </div>

          <div className="group focus-within:text-orange-base mb-12">
            <label htmlFor="passworConfirmation" className="text-gray-300 group-focus-within:text-orange-base text-xs">CONFIRMAR SENHA</label>
            <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
              <KeyRound className="text-gray-200 group-focus-within:text-orange-base"/>
              <input 
              type={inputType} placeholder="Confirme a senha"
              className="bg-transparent text-gray-200
              outline-none w-full
              "
              id="passwordConfirmation"
              {...register("passwordConfirmation")}
              />
              <button
                onMouseDown={handleShowPassword} 
                onMouseUp={handleHidePassword}
                onMouseLeave={handleHidePassword}
                type="button"
              >
                <Eye className="text-gray-200"/>
              </button>
            </div>
            {errors.passwordConfirmation  && <span className="flex  items-center  gap-2 text-danger  text-xs "><CircleAlert width={16}/>{errors.passwordConfirmation .message}</span>}
          </div>

          <button className="justify-between flex rounded-lg bg-orange-base border-transparent hover:bg-orange-dark text-white p-2 w-full" disabled={isSubmitting || Object.keys(errors).length > 0}>
            Cadastrar 
            <ArrowRight/>
          </button>
        </form>

        <footer className="flex flex-col gap-5">
          <span className="text-gray-300">Já tem uma conta?</span>
          <Link to="/sign-in" className="justify-between flex rounded-lg border border-orange-base text-orange-base p-2 w-full hover:text-orange-dark hover:border-orange-dark">
            Acessar 
            <ArrowRight/>
          </Link>
        </footer>
    </div>
  )
}