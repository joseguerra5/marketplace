import { ArrowRight, Eye, ImageUp, KeyRound, Mail, Phone, UserRound } from "lucide-react";

export function SignUp() {
  return (
    <div className="rounded-3xl bg-white overflow-auto max-h-[90dvh] p-20 m-6 flex flex-col gap-10">
        <header className="flex flex-col gap-2">
          <h2 className="text-gray-500 font-bold text-2xl">Crie sua conta</h2>
          <span className="text-gray-300 text-sm">Informe os seus dados pessoais e de acesso</span>
        </header>

        <form action="" className="flex flex-col gap-5" >
          <h2 className="text-gray-500 font-bold text-lg ">Perfil</h2>
          <div className=" rounded-lg bg-shape size-fit">
            <label htmlFor="avatar" className="w-full h-full  justify-center items-center flex p-11">
              <ImageUp className="text-orange-base " width={32}/>
              <input type="file" name="avatar" id="avatar" className="hidden"/>
            </label>
          </div>

          <div className="group focus-within:text-orange-base">
            <label htmlFor="" className="text-gray-300 group-focus-within:text-orange-base text-xs">NOME</label>
            <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
              <UserRound className="text-gray-200 group-focus-within:text-orange-base"/>
              <input 
              type="text" placeholder="Seu nome completo"
              className="group bg-transparent placeholder-gray-200
              text-gray-500
              caret-orange-base
              outline-none w-full
              "
              />
            </div>
          </div>

          <div className="group focus-within:text-orange-base mb-12">
            <label htmlFor="" className="text-gray-300 group-focus-within:text-orange-base text-xs">TELEFONE</label>
            <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
              <Phone className="text-gray-200 group-focus-within:text-orange-base"/>
              <input 
              type="text" placeholder="000 000 000"
              className="bg-transparent text-gray-200
              outline-none w-full
              "
              />
            </div>
          </div>

          <h2 className="text-gray-500 font-bold text-lg ">Acesso</h2>

          <div className="group focus-within:text-orange-base">
            <label htmlFor="" className="text-gray-300 group-focus-within:text-orange-base text-xs">E-MAIL</label>
            <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
              <Mail className="text-gray-200 group-focus-within:text-orange-base"/>
              <input 
              type="text" placeholder="Digite seu e-mail de acesso"
              className="bg-transparent text-gray-200
              outline-none w-full
              "
              />
            </div>
          </div>

          <div className="group focus-within:text-orange-base">
            <label htmlFor="" className="text-gray-300 group-focus-within:text-orange-base text-xs">SENHA</label>
            <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
              <KeyRound className="text-gray-200 group-focus-within:text-orange-base"/>
              <input 
              type="password" placeholder="Senha de acesso"
              className="bg-transparent text-gray-200
              outline-none w-full
              "
              />
              <button>
                <Eye className="text-gray-200"/>
              </button>
            </div>
          </div>

          <div className="group focus-within:text-orange-base mb-12">
            <label htmlFor="" className="text-gray-300 group-focus-within:text-orange-base text-xs">CONFIRMAR SENHA</label>
            <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
              <KeyRound className="text-gray-200 group-focus-within:text-orange-base"/>
              <input 
              type="password" placeholder="Confirme a senha"
              className="bg-transparent text-gray-200
              outline-none w-full
              "
              />
              <button>
                <Eye className="text-gray-200"/>
              </button>
            </div>
          </div>

          <button className="justify-between flex rounded-lg bg-orange-base border-transparent hover:bg-orange-dark text-white p-2 w-full">
            Cadastrar 
            <ArrowRight/>
          </button>
        </form>

        <footer className="flex flex-col gap-5">
          <span className="text-gray-300">Já tem uma conta?</span>
          <button className="justify-between flex rounded-lg border border-orange-base text-orange-base p-2 w-full hover:text-orange-dark hover:border-orange-dark">
            Acessar 
            <ArrowRight/>
          </button>
        </footer>
    </div>
  )
}