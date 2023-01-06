import { FunctionComponent, PropsWithChildren } from "react";
import { Menu } from "@headlessui/react";
import BurgerMenuIcon from "@common/assets/burger-menu-icon.svg";
import CloseMenuIcon from "@common/assets/close.svg";
import Image from "next/image";
import GenericTransition from "./animations/src/genericTransition";
interface MenuItemProps {
  isActiveStyle?: boolean;
  children: React.ReactNode;
}

const MenuItem: FunctionComponent<MenuItemProps> = ({
  children,
  isActiveStyle,
}) => {
  const defaultStyle =
    "text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm";
  const activeStyle = "hover:bg-violet-500 hover:text-white " + defaultStyle;

  return (
    <div className={isActiveStyle ? activeStyle : defaultStyle}>{children}</div>
  );
};

const SectionWrapper: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className="px-1 py-1 ">{children}</div>;
};
interface SectionDropDown {
  items: MenuItemProps[];
}

interface MenuDropDownProps {
  sections: SectionDropDown[];
}

const MenuDropDown: FunctionComponent<MenuDropDownProps> = ({ sections }) => {
  return (
    <Menu as="div" className="relative inline-block text-left md:hidden">
      {({ open }) => (
        <>
          <Menu.Button>
            <Image
              src={open ? CloseMenuIcon : BurgerMenuIcon}
              alt="burger-menu-icon"
              width={35}
            />
          </Menu.Button>
          <GenericTransition>
            <Menu.Items className="absolute w-screen right-[-20px] mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              {sections.map((section, sectionIndex) => (
                <SectionWrapper key={sectionIndex}>
                  {section.items.map((item, itemIndex) => (
                    <MenuItem
                      key={itemIndex}
                      isActiveStyle={item.isActiveStyle}
                    >
                      {item.children}
                    </MenuItem>
                  ))}
                </SectionWrapper>
              ))}
            </Menu.Items>
          </GenericTransition>
        </>
      )}
    </Menu>
  );
};

export default MenuDropDown;
