import { NextPage } from "next";
import { FunctionComponent } from "react";
import { useAppSelector } from "@common/hooks";
import { ProductCart } from "@module/cart";
import NoItemIllustration from "@common/assets/no-item.webp";
import Image from "next/image";
import { BaseLayout } from "@common/components";

const Cart: NextPage = () => {
  const products = useAppSelector((state) => state.cart.products);

  const Products: FunctionComponent = () => {
    return (
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-3xl font-medium">Cart</h1>
          <div className="bg-gray-200 h-[.5px] my-3"></div>
        </div>
        <div className="flex flex-col gap-8">
          {products?.map((product, index) => (
            <ProductCart product={product} key={index} />
          ))}
        </div>
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

  return <BaseLayout>{products ? <Products /> : <NoItemInCard />}</BaseLayout>;
};

export default Cart;
