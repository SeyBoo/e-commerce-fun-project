import { useState } from "react";
import { FromTheLeftAnimation } from "./animations/fromTheRightAnimation";
import CalculateAnimationDelay from "../utils/calculateAnimationDelay";

interface GridProps<T> {
  data: T[] | undefined;
  renderItem: (value: T) => React.ReactNode;
  renderSkeleton: () => React.ReactNode;
  loading: boolean;
}

function Grid<T>({ data, renderSkeleton, renderItem, loading }: GridProps<T>) {
  const [gridItemNumber, setGridItemNumber] = useState<number>(4);
  const slicedArray = data && data.slice(0, gridItemNumber);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {loading && renderSkeleton()}
        {slicedArray && (
          <>
            {slicedArray.map((item, index) => (
              <FromTheLeftAnimation
                key={index}
                delay={CalculateAnimationDelay(index)}
              >
                {renderItem(item)}
              </FromTheLeftAnimation>
            ))}
          </>
        )}
      </div>
      {slicedArray && slicedArray.length < data.length && (
        <div className="flex justify-center mt-6 text-lg">
          <button
            onClick={() => setGridItemNumber(gridItemNumber + 4)}
            className="border border-black py-2 px-6 rounded-full font-medium"
          >
            See more
          </button>
        </div>
      )}
    </>
  );
}

export default Grid;
