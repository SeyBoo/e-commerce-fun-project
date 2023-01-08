import { FunctionComponent } from "react";

interface QuantityInputProps {
  itemNumber: number;
  setItemNumber: (itemNumber: number) => void;
}

export const QuantityInput: FunctionComponent<QuantityInputProps> = ({
  itemNumber,
  setItemNumber,
}) => {
  const handleDecrementItemNumber = () => {
    if (itemNumber > 1) {
      setItemNumber(itemNumber - 1);
    }
  };

  return (
    <div className="flex items-center justify-between border rounded-lg py-1 px-3 gap-7">
      <button
        className="cursor-pointer text-gray-400 text-2xl"
        onClick={() => handleDecrementItemNumber()}
      >
        -
      </button>
      <input
        type="number"
        className="text-center text-gray-500 text-xl w-10 appearance-none"
        onChange={(e) => setItemNumber(parseFloat(e.target.value))}
        value={itemNumber}
        min={1}
      />
      <button
        className="cursor-pointer text-gray-400 text-2xl"
        onClick={() => setItemNumber(itemNumber + 1)}
      >
        +
      </button>
    </div>
  );
};
