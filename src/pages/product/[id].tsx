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
import {
  SkeletonImage,
  BaseLayout,
  TextSkeleton,
  QuantityInput,
} from "@common/components";
import { useSnack, useAppDispatch } from "@common/hooks";
import { addToCart } from "@module/cart";
import {
  getProductsPaths,
  prefetchProduct,
  useGetProduct,
} from "@module/products";

const Product: NextPage = () => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const setSnackBar = useSnack();

  const productId = query.id as string;
  const { data, status } = useGetProduct(productId, { enabled: !!productId });

  const productLoading = useMemo(
    () => status === "loading" || status === "idle",
    [status]
  );
  const [itemNumber, setItemNumber] = useState<number>(1);

  if (productLoading || !data) return <ProductPageSkeleton />;

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCart({ product: data, quantity: itemNumber }));
    } catch (e) {
      setSnackBar({
        title: "Couldn't add item to card.",
        type: "error",
      });
    }
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
              <QuantityInput
                itemNumber={itemNumber}
                setItemNumber={setItemNumber}
              />
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
  const paths = await getProductsPaths();

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

const ProductPageSkeleton = () => {
  return (
    <BaseLayout>
      <div className="flex flex-col items-center gap-6 md:grid md:grid-cols-2 max-w-7xl m-auto md:mt-20">
        <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] m-auto">
          <div className="w-[95%] h-[95%]">
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
