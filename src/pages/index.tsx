import { NextPage } from "next";
import { BaseLayout } from "@common/components";
import { RecommandedProducts } from "@module/products";

const Home: NextPage = () => {
  return (
    <BaseLayout>
      {/*       <h1 className="font-semibold text-2xl">Shop our top categories</h1>
       */}
      <h2 className="font-semibold text-2xl">
        Today&apos;s best deal for you!
      </h2>
      <RecommandedProducts />

      {/* <h3 className="font-semibold text-2xl">Weekly popular products</h3> */}
    </BaseLayout>
  );
};

export default Home;
