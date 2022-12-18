import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { dehydrate, QueryClient } from "react-query";
import {
  getProductPaths,
  prefetchProduct,
  useGetProduct,
} from "../../module/products/api/products.api";

const Product: NextPage = () => {

  return null;
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
