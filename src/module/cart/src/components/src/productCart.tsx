import { FunctionComponent } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteFromCart, ProductCartI } from "@module/cart";
import DeleteIcon from "@common/assets/delete-icon.svg";
import { useSnack, useAppDispatch } from "@common/hooks";

interface ProductCartProps {
  product: ProductCartI;
}

export const ProductCart: FunctionComponent<ProductCartProps> = ({
  product,
}) => {
  const dispatch = useAppDispatch();
  const setSnackBar = useSnack();

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
    <div className="grid grid-cols-2 justify-between items-center">
      <div className="flex items-center gap-4">
        <Link
          className="relative w-[100px] h-[100px]"
          href={{ pathname: `/product/${product.id}` }}
          as={`/product/${product.id}`}
        >
          <Image src={product.image} alt={product.title} fill />
        </Link>
        <p className="text-lg font-medium">{product.title}</p>
      </div>
      <div className="flex justify-end gap-4 items-center">
        <p>{product.count}</p>
        <p className="text-lg font-semibold">{product.price}$</p>
        <button onClick={() => handleRemoveProduct()}>
          <Image src={DeleteIcon} alt="" width={25} height={20} />
        </button>
      </div>
    </div>
  );
};
