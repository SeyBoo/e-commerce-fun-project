import { useRef, useState } from "react";
import CalculateAnimationDelay from "../utils/calculateAnimationDelay";
import useOutsideAlerter from "../utils/useOutsideAlerter";
import { FromTheTopAnimation } from "./animations/fromTheTopAnimation";

interface SearchProps<T> {
  placeholder: string;
  data: T[];
  field: keyof T;
  renderSearchItem: (value: T) => React.ReactNode;
}

function Search<T>({
  placeholder,
  data,
  renderSearchItem,
  field,
}: SearchProps<T>) {
  const [inputedSearch, setInputedSearch] = useState<string>("");
  const [isInputSelected, setIsInputedSelected] = useState<boolean>(false);

  const filteredData = data?.filter((product) => {
    const val = product[field];
    return typeof val === "string" && val.includes(inputedSearch);
  });

  const HandleRenderSearchedProducts = () => {
    return (
      <div className="relative flex flex-col gap-4 z-50 bg-white shadow rounded-md max-w-md max-h-80 overflow-y-scroll overflow-x-hidden">
        {filteredData?.map((item, index) => (
          <FromTheTopAnimation
            key={index}
            delay={CalculateAnimationDelay(index)}
          >
            {renderSearchItem(item)}
          </FromTheTopAnimation>
        ))}
      </div>
    );
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter({
    ref: wrapperRef,
    setSelected: (value: boolean) => setIsInputedSelected(value),
  });

  return (
    <div
      className="md:flex md:flex-col h-11 w-full md:m-w-96 max-w-md"
      ref={wrapperRef}
      onSelect={() => setIsInputedSelected(true)}
    >
      <div className="relative w-full">
        <input
          type="search"
          id="default-search"
          className="block w-full px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          placeholder={placeholder}
          required
          onChange={(e) => setInputedSearch(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>
      <div>
        {isInputSelected && inputedSearch !== "" ? (
          <HandleRenderSearchedProducts />
        ) : null}
      </div>
    </div>
  );
}

export default Search;
