import { Link } from "react-router-dom";
import { ProductStatus } from "./product-status";

interface ProductLinkProps {
  products: {
    id: string;
    title: string | null;
    description: string | null;
    priceInCents: 1;
    status: "available" | "sold" | "cancelled";
    owner: {
      id: string;
      name: string | null;
      phone: string | null;
      email: string | null;
      avatar: {
        id: string | null;
        url: string | null;
      };
    };
    category: {
      id: string;
      title: string | null;
      slug: string | null;
    };
    attachments: {
      id: string;
      url: string | null;
    }[];
  };
}

export function ProductLink({ products }: ProductLinkProps) {
  return (
    <Link
      to={`/products/${products.id}`}
      className=" bg-white rounded-xl p-1 min-w-fit min-h-fit hover:outline-blue-base outline-none"
    >
      <div className="relative">
        <div className="absolute top-2 right-2 flex gap-2">
          <ProductStatus status={products.status} />
          <span className="rounded-full text-white px-3 bg-gray-400 uppercase text-xs">
            {products.category.title}
          </span>
        </div>
        <img
          src={products.attachments[0].url ?? ""}
          className="rounded-xl w-full h-40 object-cover "
          alt=""
        />
      </div>
      <div className="text-gray-400 font-bold m-3 flex justify-between">
        <span>{products.title}</span>
        <span>
          {(products.priceInCents / 100).toLocaleString("PT-pt", {
            style: "currency",
            currency: "EUR",
          })}
        </span>
      </div>
      <p className="text-gray-300 m-3 line-clamp-2">{products.description}</p>
    </Link>
  );
}
