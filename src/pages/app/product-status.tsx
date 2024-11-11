export type ProductStatus =   
| "sold"
| "cancelled"
| "available"

interface ProductStatusProps {
  status: ProductStatus
}

const productStatusMap: Record<ProductStatus, string> = {
  sold: "VENDIDO",
  cancelled: "DESATIVADO",
  available: "ANUNCIADO",
}

export function ProductStatus({status}: ProductStatusProps) {
  return (
    <>
      {status === "sold" && (
        <span className="rounded-full text-white px-3 bg-success text-xs text-center">{productStatusMap[status]}</span>
      )}

      {status === "cancelled" && (
        <span className="rounded-full text-white px-3 bg-gray-300 text-center text-xs ">{productStatusMap[status]}</span>
      )}

      {status === "available" && (
        <span className="rounded-full text-white px-3 bg-blue-dark text-xs text-center">{productStatusMap[status]}</span>
      )}
    </>
  )
}
