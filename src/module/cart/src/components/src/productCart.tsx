import { FunctionComponent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteFromCart, ProductCartI } from "@module/cart";
import { useSnack, useAppDispatch } from "@common/hooks";
import { QuantityInput } from "@common/components";

interface ProductCartProps {
  product: ProductCartI;
}

export const ProductCart: FunctionComponent<ProductCartProps> = ({
  product,
}) => {
  const dispatch = useAppDispatch();
  const setSnackBar = useSnack();
  const [itemNumber, setItemNumber] = useState<number>(product.count);

  const handleRemoveProduct = async () => {
    try {
      await dispatch(deleteFromCart({ product }));
    } catch (e) {
      setSnackBar({
        title: "Coudln't delete product",
        type: "error",
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <Link
        className="relative w-[200px] h-[200px]"
        href={{ pathname: `/product/${product.id}` }}
        as={`/product/${product.id}`}
      >
        <Image src={product.image} alt={product.title} fill />
      </Link>
      <div className="flex flex-col w-full gap-4 max-w-[400px] sm:max-w-full">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl text-gray-600">{product.title}</p>
            <p className="text-lg font-light text-gray-400 mt-2">${product.price}</p>
          </div>
          <p className="text-2xl font-normal">${product.totalPrice}</p>
        </div>
        <div>
          <div className="flex justify-between items-center w-full">
            <QuantityInput
              itemNumber={itemNumber}
              setItemNumber={setItemNumber}
            />
            <button
              onClick={() => handleRemoveProduct()}
              className="flex items-center gap-1"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
