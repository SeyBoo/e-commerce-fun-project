import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "react-query";
import { BaseLayout, GridInfiteQuery } from "@common/components";
import {
  getAllCategories,
  prefetchCategory,
  useGetCategory,
} from "@module/category";
import {
  ProductCard,
  ProductI,
  ProductCardSkeleton,
  SearchProducts,
} from "@module/products";

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
