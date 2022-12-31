import { FunctionComponent } from "react";
import { ProductI } from "../../products/types/products.interface";
import Image from "next/image";
import Link from "next/link";
import { ProductCartI } from "../types/cart.interface";

interface ProductCartProps {
  product: ProductCartI;
}

export const ProductCart: FunctionComponent<ProductCartProps> = ({
  product,
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <Link
          className="relative w-[100px] h-[100px]"
          href={{ pathname: `/product/${product.id}` }}
          as={`/product/${product.id}`}
        >
          <Image src={product.image} alt={product.title} fill />
        </Link>
        <p>{product.title}</p>
      </div>
      <p>{product.count}</p>
      <p>{product.price}$</p>
    </div>
  );
};
