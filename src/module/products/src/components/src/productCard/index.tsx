import { FunctionComponent } from "react";
import Image from "next/image";
import { ProductI } from "../../../types/src/products.interface";
import Link from "next/link";
import Rating from "../rating";
import { useAppDispatch, useSnack } from "../../../../../../common/hooks";
import { addToCart } from "../../../../../cart";
import { ZoomOnHover } from "../../../../../../common/components/src/animations/src/zoomInAnimation";

interface ProductCardProps {
  product: ProductI;
}

export const ProductCard: FunctionComponent<ProductCardProps> = ({
  product,
}) => {
  const dispatch = useAppDispatch();
  const setSnackBar = useSnack();

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCart({ product }));
    } catch (e) {
      setSnackBar({
        title: "Couldn't add item to card.",
        type: "error",
      });
    }
  };

  return (
    <div className="shadow-md p-5 rounded-xl flex flex-col gap-3">
      <Link
        href={{ pathname: `/product/${product.id}` }}
        as={`/product/${product.id}`}
        className="cursor-pointer"
      >
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
      <Rating rating={product.rating} />
      <button
        className="border border-black rounded-full px-4 py-2 text-black font-medium self-start hover:text-white hover:bg-black"
        onClick={() => handleAddToCart()}
      >
        Add to cart
      </button>
    </div>
  );
};
