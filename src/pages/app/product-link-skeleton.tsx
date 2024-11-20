import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

export function ProductSkeleton() {
  return Array.from({length: 6}).map((_, i) => {
    return (
      <>
          <Link
            to="#"
            key={i}
            className=" bg-white rounded-xl p-1 min-w-fit max-w-80 min-h-fit hover:outline-blue-base outline-none overflow-hidden"
          >
            <div className="relative">
              <Skeleton
                className="rounded-xl w-full h-40 object-cover "
              />
            </div>
            <div className="text-gray-400 font-bold m-3 flex justify-between">
              <Skeleton className="w-32 h-6"/>
              <Skeleton className="w-16 h-6"/>
            </div>
            <Skeleton className="w-full h-12"/>
          </Link>
      </>
    )
  }, 
)}      
