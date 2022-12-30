import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { dehydrate, QueryClient } from "react-query";
import {
  getAllCategories,
  prefetchCategory,
} from "../../module/category/api/category.api";

const CategoryPage: NextPage = () => {
  return null;
};

export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getAllCategories();
  return {
    paths: categories.map((category) => ({
      params: { id: JSON.stringify(category) },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const id = context.params?.id as string;
  const queryClient = new QueryClient();
  const queryData = await prefetchCategory(queryClient, id);

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
