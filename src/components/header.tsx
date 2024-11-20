import { Box, ChartColumnBig, LogOut, Plus, User } from "lucide-react";
import { NavLink } from "./nav-link";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import {
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { SignOut } from "@/api/sign-out";
import {toast} from "sonner"

export function Header() {
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryFn: getProfile,
    queryKey: ["profile"],
  });

  const { mutateAsync: signOutFn, isPending: isSignOut } = useMutation({
    mutationFn: SignOut,
    onSuccess: () => {
      navigate("/", {
        replace: true,
      });
    },
  });

  function handleSignOut() {
    toast.promise(
      signOutFn(),
      {
        loading: 'Saindo do perfil...',
        success: () => 'Você saiu com sucesso!',
        error: 'Ocorreu um erro ao sair do perfil.',
      }
    );
  }
  

  return (
    <header className="flex justify-between  py-5 ">
      <Link to="/dashboard">
        <img src="../src/assets/logo-icon.svg" />
      </Link>

      <div className="flex gap-2">
        <NavLink to="/dashboard">
          <ChartColumnBig />
          Dashboard
        </NavLink>

        <NavLink to="/products">
          <Box />
          Produtos
        </NavLink>
      </div>
      <div className="flex gap-3 items-center justify-center">
        <Link
          to="/product/new"
          className="border-none bg-orange-base hover:bg-orange-dark text-white flex gap-2 p-1 rounded-md"
        >
          <Plus />
          <span>Novo produto</span>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {profile?.seller?.avatar?.url ? (
              <img
                src={profile.seller.avatar.url}
                alt="Avatar"
                className="rounded-xl aspect-square w-12"
              />
            ) : (
              <User className="rounded-xl aspect-square w-12" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="gap-2 flex flex-col p-2">
            <DropdownMenuLabel className="flex gap-2">
              {profile?.seller?.avatar?.url ? (
                <img
                  src={profile.seller.avatar.url}
                  alt="Avatar"
                  className="rounded-xl aspect-square w-8"
                />
              ) : (
                <User className="rounded-xl aspect-square w-8 bg-background-theme" />
              )}

              <span className="line-clamp-2 w-fit text-sm text-gray-300">
                {profile?.seller.name ?? ""}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild disabled={isSignOut}>
              <button
                onClick={handleSignOut}
                type="button"
                className="flex items-center text-orange-base justify-between hover:text-orange-dark w-full"
              >
                <span>Sair</span> <LogOut />
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
