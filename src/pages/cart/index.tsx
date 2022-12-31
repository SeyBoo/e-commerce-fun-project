import { NextPage } from "next";
import { FunctionComponent } from "react";
import BaseLayout from "../../common/components/layouts/baseLayout";
import { useAppSelector } from "../../common/hooks/store";
import { ProductCart } from "../../module/cart/components/productCart";
import NoItemIllustration from "../../common/assets/no-item.webp";
import Image from "next/image";

const Cart: NextPage = () => {
  const cartProducts = useAppSelector((state) => state.cart.products);

  const ProductsInCart: FunctionComponent = () => {
    return (
      <div className="flex flex-col gap-8">
        {cartProducts?.map((product, index) => (
          <ProductCart product={product} key={index} />
        ))}
      </div>
    );
  };

  const NoItemInCard: FunctionComponent = () => {
    return (
      <div className="flex flex-col items-center -mt-10 text-center">
        <Image
          src={NoItemIllustration}
          alt="no-item-illustration"
          width={500}
          height={500}
        />
        <p className="text-2xl">No item in card</p>
      </div>
    );
  };

  return (
    <BaseLayout>
      {cartProducts ? <ProductsInCart /> : <NoItemInCard />}
    </BaseLayout>
  );
};

export default Cart;
