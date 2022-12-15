import { NextPage } from "next";
import BaseLayout from "../common/components/layouts/baseLayout";
import RecommandedProducts from "../module/products/components/recommandedProducts";

const Home: NextPage = () => {
  return (
    <BaseLayout>
      <h2 className="font-semibold text-2xl">
        Today&apos;s best deal for you!
      </h2>
      <RecommandedProducts />
    </BaseLayout>
  );
};

export default Home;
