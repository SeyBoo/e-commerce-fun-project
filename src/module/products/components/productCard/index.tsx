import { FunctionComponent } from "react";
import Image from "next/image";
import { Product } from "../../types/products.interface";
import Link from "next/link";
import Ratings from "../ratings";
import { ZoomOnHover } from "../../../../common/components/animations/zoomInAnimation";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FunctionComponent<ProductCardProps> = ({ product }) => {
  return (
    <div className="shadow-md p-5 rounded-xl flex flex-col gap-3">
      <Link href={`product/${product.id}`} className="cursor-pointer">
        <div className="self-center p-8 flex justify-center">
          <ZoomOnHover>
            <div className="h-[200px] w-[200px] relative">
              <Image src={product.image} alt={product.title} fill sizes="1" />
            </div>
          </ZoomOnHover>
        </div>
      </Link>
      <div className="flex justify-between items-center font-semibold gap-1">
        <div>
          <h1 className="w-[100%] overflow-hidden h-6 text-xl">
            {product.title}
          </h1>
          <p className="w-[100%] overflow-hidden h-6 text-md text-gray-400 font-normal">
            {product.title}
          </p>
        </div>
        <span className="flex text-2xl">
          <p className="text-xs">$</p>
          <p>{product.price}</p>
        </span>
      </div>
      <Ratings ratings={product.rating} />

      <button className="border border-black rounded-full px-4 py-2 text-black font-medium self-start hover:text-white hover:bg-black">
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
