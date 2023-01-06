import { FunctionComponent } from "react";
import { GridInfiteQuery } from "@common/components";
import { useGetAllProducts } from "../../api";
import { ProductI } from "../../types";
import { ProductCard } from "./productCard";
import { ProductCardSkeleton } from "./productCard/skeleton";

export const RecommandedProducts: FunctionComponent = () => {
  const query = useGetAllProducts();

  return (
    <GridInfiteQuery<ProductI>
      query={query}
      renderItem={(product) => <ProductCard product={product} />}
      renderSkeleton={() => <ProductCardSkeleton />}
    />
  );
};
