import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { FunctionComponent, useMemo, useState } from "react";
import { dehydrate, QueryClient } from "react-query";
import BaseLayout from "../../common/components/layouts/baseLayout";
import {
  getProductPaths,
  prefetchProduct,
  useGetProduct,
} from "../../module/products/api/products.api";
import SkeletonImage from "../../common/components/skeletons/skeleton-image";
import TextSkeleton from "../../common/components/skeletons/text-skeleton";
import { useAppDispatch } from "../../common/hooks/store";
import { addToCart } from "../../module/cart/store/thunk";
import { useSnack } from "../../common/hooks/useSnackBar";

const ProductSkeleton = () => {
  return (
    <BaseLayout>
      <div className="flex flex-col items-center gap-6 md:grid md:grid-cols-2 max-w-7xl m-auto md:mt-20">
        <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
          <div className="w-[90%] h-[90%]">
            <SkeletonImage />
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <TextSkeleton />
            <TextSkeleton />
            <TextSkeleton />
          </div>
          <div className="flex flex-col gap-4">
            <TextSkeleton />
            <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between">
                <TextSkeleton />
              </div>
              <div className="text-center">
                <TextSkeleton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

const Product: NextPage = () => {
  const { query } = useRouter();
  const productId = query.id as string;
  const { data, status } = useGetProduct(productId, { enabled: !!productId });
  const dispatch = useAppDispatch();
  const setSnackBar = useSnack();

  const productLoading = useMemo(
    () => status === "loading" || status === "idle",
    [status]
  );

  if (productLoading || !data) return <ProductSkeleton />;

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCart({ product: data }));
    } catch (e) {
      setSnackBar({
        title: "Couldn't add item to card.",
        type: "error",
      });
    }
  };

  const QuantityInput: FunctionComponent = () => {
    const [itemNumber, setItemNumber] = useState<number>(1);

    const handleDecrementItemNumber = () => {
      if (itemNumber > 1) {
        setItemNumber(itemNumber - 1);
      }
    };

    return (
      <div className="flex items-center justify-between">
        <button
          className="cursor-pointer text-[#2D472B] font-bold text-xl"
          onClick={() => handleDecrementItemNumber()}
        >
          -
        </button>
        <input
          type="number"
          className="text-center text-[#2D472B] font-bold text-xl w-16"
          onChange={(e) => setItemNumber(parseFloat(e.target.value))}
          value={itemNumber}
          min={1}
        />
        <button
          className="cursor-pointer text-[#2D472B] font-bold text-xl"
          onClick={() => setItemNumber(itemNumber + 1)}
        >
          +
        </button>
      </div>
    );
  };

  return (
    <BaseLayout>
      <div className="flex flex-col items-center gap-6 md:grid md:grid-cols-2 max-w-7xl m-auto md:mt-20">
        <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
          <Image src={data.image} alt={data.title} fill sizes="1" />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="uppercase text-[#2D472B] font-bold text-xl tracking-wider">
              {data.category}
            </h2>
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <p className="text-gray-500">{data.description}</p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-4xl font-bold">${data.price}</h3>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
              <QuantityInput />
              <div className="text-center">
                <button
                  className="bg-[#2D472B] text-white font-bold w-full p-3 rounded-lg"
                  onClick={() => handleAddToCart()}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Product;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getProductPaths();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const id = context.params?.id as string;
  const queryClient = new QueryClient();
  const queryData = await prefetchProduct(queryClient, id);

  if (!queryData) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      notFound: false,
    },
  };
};
