import { ArrowRight, CircleAlert, Eye, KeyRound, Loader2, Mail } from "lucide-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../../api/sign-in";
import { toast } from "sonner";
import { isAxiosError } from "axios";

const signInForm = z.object({
  email: z.string().email({ message: "Insira um email válido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 dígitos" }),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
    resolver: zodResolver(signInForm),
  });

  const [inputType, setInputType] = useState("password");

  const handleShowPassword = () => setInputType("text");
  const handleHidePassword = () => setInputType("password");

  //facilitador do backend com o frontend, usa sempre nas mutaçãoes e não nas queries
  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({ email: data.email, password: data.password });
      toast.success("Log in realizado com sucesso, aproveite o dashboard");
      navigate("/dashboard");
    } catch (e) {
      if (isAxiosError(e)) {
        const status = e.response?.status;

        if (status === 403) {
          toast.error("Email ou senha inválido, por favor verificar as informações");
        } 
      } else {
        toast.error("Algo deu errado, tente novamente mais tarde!");
      }
      }
    }
  

  return (
    <div className="rounded-3xl bg-white">
      <div className="flex flex-col m-6 p-20 gap-12 border-r-blue-500">
        <header className="flex flex-col gap-2">
          <h2 className="text-gray-500 font-bold text-2xl">Acesse sua conta</h2>
          <span className="text-gray-300 text-sm">
            Informe seu e-mail e senha para entrar
          </span>
        </header>

        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="flex flex-col gap-5"
        >
          <div className="group focus-within:text-orange-base">
            <label
              htmlFor="email"
              className="text-gray-300 group-focus-within:text-orange-base text-xs"
            >
              E-MAIL
            </label>
            <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
              {!errors.email ? (
                <Mail className="text-gray-200 group-focus-within:text-orange-base" />
              ) : (
                <Mail className="text-danger" />
              )}
              <input
                type="text"
                placeholder="Digite seu e-mail"
                className="bg-transparent text-gray-400 placeholder:text-gray-200
              outline-none w-full"
                id="email"
                {...register("email", { required: true })}
              />
            </div>
            {errors.email && (
              <span className="flex  items-center  gap-2 text-danger  text-xs ">
                <CircleAlert width={16} />
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="group focus-within:text-orange-base">
            <label
              htmlFor="password"
              className="text-gray-300 group-focus-within:text-orange-base text-xs"
            >
              SENHA
            </label>
            <div className=" bg-transparent py-2 border-b-2 flex gap-2 w-full">
              {!errors.password ? (
                <KeyRound className="text-gray-200 group-focus-within:text-orange-base" />
              ) : (
                <KeyRound className="text-danger" />
              )}
              <input
                type={inputType}
                placeholder="Digite seu e-mail"
                className="bg-transparent text-gray-400 placeholder:text-gray-200
              outline-none w-full"
                id="password"
                {...register("password", { required: true })}
              />
              <button
                onMouseDown={handleShowPassword}
                onMouseUp={handleHidePassword}
                onMouseLeave={handleHidePassword}
                type="button"
              >
                <Eye className="text-gray-200 hover:text-orange-base" />
              </button>
            </div>
            {errors.password && (
              <span className="flex  items-center  gap-2 text-danger  text-xs ">
                <CircleAlert width={16} />
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            className="justify-center flex rounded-lg bg-orange-base border-transparent hover:bg-orange-dark text-white p-2 w-full disabled:cursor-not-allowed disabled:bg-orange-base/60"
            disabled={isSubmitting || Object.keys(errors).length > 0}
          >
            {isSubmitting ? <Loader2 className="animate-spin self-center"/> : <span className="justify-between flex w-full">Acessar <ArrowRight /></span>}
            
          </button>   
        </form>

        <footer className="flex flex-col gap-5">
          <span className="text-gray-300">Ainda não tem uma conta?</span>
          <Link
            to="/sign-up"
            className="justify-between flex rounded-lg border border-orange-base text-orange-base p-2 w-full hover:text-orange-dark hover:border-orange-dark"
          >
            Cadastrar
            <ArrowRight />
          </Link>
        </footer>
      </div>
    </div>
  );
}
