import { MutableRefObject, useEffect } from "react";

interface UseOutsideAlerterProps {
  ref: MutableRefObject<any>;
  setSelected: (value: boolean) => void;
}

const useOutsideAlerter = ({ ref, setSelected }: UseOutsideAlerterProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setSelected(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setSelected]);
};

export default useOutsideAlerter;
