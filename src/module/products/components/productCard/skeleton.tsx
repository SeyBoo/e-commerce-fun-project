import { FunctionComponent } from "react";
import SkeletonImage from "../../../../common/components/skeletons/skeleton-image";
import TextSkeleton from "../../../../common/components/skeletons/text-skeleton";

const ProductCardSkeleton: FunctionComponent = () => {
  return (
    <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
      <div className="shadow-md p-5 rounded-xl flex flex-col gap-3 items-center">
        <div>
          <div className="self-center p-8">
            <div className="w-[200px] h-[200px] flex justify-center items-center bg-gray-300 rounded dark:bg-gray-700">
              <SkeletonImage />
            </div>
          </div>
          <div className="flex items-center font-semibold gap-8 border-">
            <TextSkeleton />
            <div className="flex items-center w-full space-x-2 max-w-[480px]">
              <TextSkeleton />
            </div>
          </div>
          <div className="mt-2">
            <TextSkeleton />
          </div>
        </div>
        <div className="mt-2">
          <TextSkeleton />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;