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
}

const PanelItem: FunctionComponent<PanelItem> = ({ name, image }) => {
  return (
    <Link
      key={name}
      href={{ pathname: `/category/${name}`}}
      as={`/category/${name}`}
      className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white">
        <Image src={image} alt={`${name} icon`} />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-900">{name}</p>
      </div>
    </Link>
  );
};

interface PopOverProps {
  triggerButton: React.ReactNode;
  panelItems: PanelItem[];
}

const PopOverPanel: FunctionComponent<PopOverProps> = ({
  triggerButton,
  panelItems,
}) => {
  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button className="flex items-center">
            {triggerButton}
            <Image src={DownIcon} alt="" width={20} />
          </Popover.Button>
          <GenericTransition>
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-8 bg-gray-50 p-7 lg:grid-cols-2">
                  {panelItems.map((item, index) => (
                    <PanelItem
                      key={index}
                      image={item.image}
                      href={item.href}
                      name={item.name}
                    />
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </GenericTransition>
        </>
      )}
    </Popover>
  );
};

export default PopOverPanel;
