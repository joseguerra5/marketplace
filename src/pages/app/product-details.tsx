import { ArrowLeft, Ban, Check } from "lucide-react";
import { Link } from "react-router-dom";


export function ProductDetails() {
  return(
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 mt-8">
          <Link to="/products" className="text-orange-base flex"><ArrowLeft/> Voltar</Link>
          <h3 className="text-gray-500 text-3xl font-bold">Editar produto</h3>
          <span className="text-gray-300 text-sm font-light">Gerencie as informações do produto cadastrado</span>  
        </div>
        <div className="flex gap-2 items-end">
          <button className="text-orange-base flex gap-2"><Check/> Marcar como vendido</button>
          <button className="text-orange-base flex gap-2"><Ban/> Desativar anúncio</button>
        </div>
      </div>
      
      
      <div className="">aaaaaaaaaaaaaa</div>
    </div>
  )
}