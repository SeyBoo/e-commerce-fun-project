import { Popover } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { FunctionComponent } from "react";
import DownIcon from "../assets/expand-down.svg";
import { StaticImageData } from "next/image";
import GenericTransition from "./animations/transitions";

export interface PanelItem {
  name: string;
  image: StaticImageData;
  f?: () => void;
}

const PanelItem: FunctionComponent<PanelItem> = ({ name, image, f }) => {
  const defaultStyle =
    "-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50";

  const DefaultContent = () => (
    <>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white gap-4">
        <Image src={image} alt={`${name} icon`} />
      </div>
      <p className="text-sm font-medium text-gray-900">{name}</p>
    </>
  );

  if (f) {
    return (
      <button className={defaultStyle} onClick={() => f()}>
        <DefaultContent />
      </button>
    );
  }

  return (
    <Link
      key={name}
      href={{ pathname: `/category/${name}` }}
      as={`/category/${name}`}
      className={defaultStyle}
    >
      <DefaultContent />
    </Link>
  );
};

interface PopOverProps {
  triggerButton: React.ReactNode;
  panelItems: PanelItem[];
  showDropDownIcon?: boolean;
}

const PopOverPanel: FunctionComponent<PopOverProps> = ({
  triggerButton,
  panelItems,
  showDropDownIcon = false,
}) => {
  return (
    <Popover>
      {() => (
        <>
          <Popover.Button className="flex items-center">
            {triggerButton}
            {showDropDownIcon && <Image src={DownIcon} alt="" width={20} />}
          </Popover.Button>
          <GenericTransition>
            <Popover.Panel className="absolute z-10">
              <div className="grid grid-cols-1 gap-4 p-4 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
                {panelItems.map((item, index) => (
                  <PanelItem
                    key={index}
                    image={item.image}
                    f={item.f}
                    name={item.name}
                  />
                ))}
              </div>
            </Popover.Panel>
          </GenericTransition>
        </>
      )}
    </Popover>
  );
};

export default PopOverPanel;
