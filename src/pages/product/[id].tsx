import {
  GetStaticPaths,
  NextPage,
} from "next";
import {
  getProductPaths,
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

