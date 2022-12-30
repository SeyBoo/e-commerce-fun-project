import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "react-query";
import GridInfiteQuery from "../../common/components/grid-infite-query";
import BaseLayout from "../../common/components/layouts/baseLayout";
import {
  getAllCategories,
  prefetchCategory,
  useGetCategory,
} from "../../module/category/api/category.api";
import ProductCard from "../../module/products/components/productCard";
import ProductCardSkeleton from "../../module/products/components/productCard/skeleton";
import SearchProducts from "../../module/products/components/searchProducts";
import { ProductI } from "../../module/products/types/products.interface";

const CategoryPage: NextPage = () => {
  const { query: RouterQuery } = useRouter();
  const id = RouterQuery.id as string;
  const query = useGetCategory(id, { enabled: !!id });

  return (
    <BaseLayout>
      <div className="flex justify-between">
        <SearchProducts data={query.data} />
      </div>
      <GridInfiteQuery<ProductI>
        query={query}
        renderItem={(product) => <ProductCard product={product} />}
        renderSkeleton={() => <ProductCardSkeleton />}
      />
    </BaseLayout>
  );
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
