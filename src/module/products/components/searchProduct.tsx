import Link from "next/link";
import Image from "next/image";
import { FunctionComponent } from "react";
import { useGetAllProducts } from "../api/products.api";
import Search from "../../../common/components/search";
import { Product } from "../types/products.interface";

const renderSearchItem = (value: Product) => {
  return (
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
  );
};

const SearchProduct: FunctionComponent = () => {
  const { data } = useGetAllProducts();

  return (
    <Search<Product>
      data={data ? data : []}
      placeholder="Search Products..."
      renderSearchItem={(value: Product) => renderSearchItem(value)}
      field="title"
    />
  );
};

export default SearchProduct;
