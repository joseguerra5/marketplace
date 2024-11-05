import { ArrowRight, Eye, KeyRound, Mail } from "lucide-react";

export function SignIn() {
  return (
    <div className="rounded-3xl bg-white h-screen">
      <div className="flex flex-col m-6 p-20 gap-12 border-r-blue-500">
        <header className="flex flex-col gap-2">
          <h2 className="text-gray-500">Acesse sua conta</h2>
          <span className="text-gray-300">Informe seu e-mail e senha para entrar</span>
        </header>

        <form action="" className="">
          <div className="mb-5">
            <label htmlFor="" className="text-gray-300">E-MAIL</label>
            <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
              <Mail className="text-gray-200"/>
              <input 
              type="text" placeholder="Digite seu e-mail"
              className="bg-transparent text-gray-200
              outline-none w-full
              "
              />
            </div>
          </div>

          <div className="mb-12">
            <label htmlFor="" className="text-gray-300">SENHA</label>
            <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
              <KeyRound className="text-gray-200"/>
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

          <button className="justify-between flex rounded-lg bg-orange-base border-transparent text-white p-2 w-full">
            Acessar 
            <ArrowRight/>
          </button>
        </form>

        <footer>
          <span className="text-gray-300 mb-5">Ainda não tem uma conta?</span>
          <button className="justify-between flex rounded-lg border border-orange-base border-transparent text-orange-base p-2 w-full">
            Acessar 
            <ArrowRight/>
          </button>
        </footer>
      </div>
    </div>
  )
}