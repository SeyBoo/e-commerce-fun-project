import { FunctionComponent } from "react";
import { SkeletonImage, TextSkeleton } from "@common/components";

export const ProductCardSkeleton: FunctionComponent = () => {
  return (
    <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
      <div className="shadow-md p-5 rounded-xl flex flex-col gap-3 items-center">
        <div>
          <div className="self-center p-8">
            <div className="w-[200px] h-[200px]">
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
