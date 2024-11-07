import { ArrowRight, Eye, KeyRound, Mail } from "lucide-react";

export function SignIn() {
  return (
    <div className="rounded-3xl bg-white">
      <div className="flex flex-col m-6 p-20 gap-12 border-r-blue-500">
        <header className="flex flex-col gap-2">
          <h2 className="text-gray-500 font-bold text-2xl">Acesse sua conta</h2>
          <span className="text-gray-300 text-sm">Informe seu e-mail e senha para entrar</span>
        </header>

        <form action="" className="flex flex-col gap-5">
          <div className="group focus-within:text-orange-base">
            <label htmlFor="" className="text-gray-300 group-focus-within:text-orange-base text-xs">E-MAIL</label>
            <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
              <Mail className="text-gray-200 group-focus-within:text-orange-base"/>
              <input 
              type="text" placeholder="Digite seu e-mail"
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
              type="password" placeholder="Digite seu e-mail"
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
            Acessar 
            <ArrowRight/>
          </button>
        </form>

        <footer className="flex flex-col gap-5">
          <span className="text-gray-300">Ainda não tem uma conta?</span>
          <button className="justify-between flex rounded-lg border border-orange-base text-orange-base p-2 w-full hover:text-orange-dark hover:border-orange-dark">
            Cadastrar 
            <ArrowRight/>
          </button>
        </footer>
      </div>
    </div>
  )
}