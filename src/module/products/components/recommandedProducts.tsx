import { FunctionComponent, useMemo } from "react";
import GridInfiteQuery from "../../../common/components/grid-infite-query";
import { useGetAllProducts } from "../api/products.api";
import { ProductI } from "../types/products.interface";
import ProductCard from "./productCard";
import ProductCardSkeleton from "./productCard/skeleton";

const RecommandedProducts: FunctionComponent = () => {
  const query = useGetAllProducts();

  return (
    <GridInfiteQuery<ProductI>
      query={query}
      renderItem={(product) => <ProductCard product={product} />}
      renderSkeleton={() => <ProductCardSkeleton />}
    />
  );
};

export default RecommandedProducts;
