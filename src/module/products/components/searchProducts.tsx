import Link from "next/link";
import Image from "next/image";
import { FunctionComponent } from "react";
import { useGetAllProducts } from "../api/products.api";
import Search from "../../../common/components/search";
import { ProductI } from "../types/products.interface";
import { ZoomOnHover } from "../../../common/components/animations/zoomInAnimation";

const renderSearchItem = (value: ProductI) => {
  return (
    <ZoomOnHover>
      <Link
        className="flex items-center justify-between w-[90%] m-auto border-b py-2"
        href={"/product/" + value.id}
        key={value.id}
      >
        <div className="flex items-center gap-2">
          <Image src={value.image} alt="#" width={50} height={50} />
          <h2>{value.title}</h2>
        </div>
        <p className="font-semibold">${value.price}</p>
      </Link>
    </ZoomOnHover>
  );
};

interface SearchProductsProps {
  data: ProductI[] | undefined;
}

const SearchProducts: FunctionComponent<SearchProductsProps> = ({ data }) => {
  return (
    <Search<ProductI>
      data={data ? data : []}
      placeholder="Search Products..."
      renderSearchItem={(value: ProductI) => renderSearchItem(value)}
      field="title"
    />
  );
};

export default SearchProducts;
