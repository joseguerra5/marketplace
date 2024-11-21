import { changeProductStatus } from "@/api/change-product-status";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ban, Check } from "lucide-react";
import { toast } from "sonner";

export type ProductStatus =
| "available"
| "sold"
| "cancelled"
| undefined;

interface ProductsStatusProps {
  status: ProductStatus
  productId: string
}

export function ChangeProductStatus({ status, productId }: ProductsStatusProps) {

  const queryClient = useQueryClient();

  const { mutateAsync: cancelProductFn,  isPending: isPendingMutationCancel } = useMutation({
    mutationFn: changeProductStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["productsAvailable"] });
      queryClient.invalidateQueries({ queryKey: ["productsSold"] });
      toast.dismiss()
      toast.success("Produto alterado com sucesso!");
    },
  });

  const { mutateAsync: soldProductFn,  isPending: isPendingMutationSold  } = useMutation({
    mutationFn: changeProductStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["productsAvailable"] });
      queryClient.invalidateQueries({ queryKey: ["productsSold"] });
      toast.dismiss()
      toast.success("Produto alterado com sucesso!");
    },
  });

  const { mutateAsync: availableProductFn, isPending: isPendingMutationAvailable } = useMutation({
    mutationFn: changeProductStatus,
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["productsAvailable"] });
      queryClient.invalidateQueries({ queryKey: ["productsSold"] });
      toast.dismiss()
      toast.success("Produto alterado com sucesso!");
    },
  });

  if (isPendingMutationCancel || isPendingMutationSold || isPendingMutationAvailable) {
    toast.loading("carregando...")
  }

  return (
    <>
   
    {status === "available" ? (
      <button
        className="text-orange-base flex gap-2 hover:text-orange-dark"
        type="button"
        onClick={() => soldProductFn({ id: productId, status: "sold" })}
      >
        <Check /> Marcar como vendido
      </button>
    ) : (
      <button
        className="text-orange-base flex gap-2 hover:text-orange-dark"
        type="button"
        onClick={() =>
          availableProductFn({ id: productId, status: "available" })
        }
      >
        <Check /> Marcar como disponível
      </button>
    )}
    <button
      className="text-orange-base flex gap-2 hover:text-orange-dark disabled:text-orange-base/60 disabled:cursor-not-allowed"
      type="button"
      disabled={
        status === "sold" ||
        status === "cancelled"
      }
      onClick={() =>
        cancelProductFn({ id: productId, status: "cancelled" })
      }
    >
      <Ban /> Desativar anúncio
    </button>
    </>
  )
}