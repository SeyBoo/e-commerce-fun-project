import Link from "next/link";
import Image from "next/image";
import { FunctionComponent } from "react";
import ElectronicsIcon from "../assets/cable.svg";
import DiamondIcon from "../assets/diamond.svg";
import ManIcon from "../assets/man.svg";
import WomanIcon from "../assets/woman.svg";
import AccountIcon from "../assets/account.svg";
import CartIcon from "../assets/cart.svg";
import Logo from "../assets/logo.svg";
import PopOverPanel, { PanelItem } from "./pop-over-panel";

const panelItems: PanelItem[] = [
  {
    name: "Electronics",
    href: "#",
    image: ElectronicsIcon,
  },
  {
    name: "Jewelery",
    href: "#",
    image: DiamondIcon,
  },
  {
    name: "Men's clothing",
    href: "#",
    image: ManIcon,
  },
  {
    name: "Women's clothing",
    href: "#",
    image: WomanIcon,
  },
];

const Nav: FunctionComponent = () => {
  return (
    <nav className="flex items-center justify-between p-5 px-20">
      <div className="flex gap-20 items-center">
        <Link href="/">
          <Image src={Logo} alt="logo" width={225} />
        </Link>
        <PopOverPanel
          triggerButton={<span className="font-medium">Categories</span>}
          panelItems={panelItems}
        />
      </div>
      <div className="flex items-center gap-6">
        <Link href="/login" className="flex items-center gap-1 font-medium">
          <Image src={AccountIcon} alt="" width={30} />
          Account
        </Link>
        <Link href="/cart" className="flex items-center gap-1 font-medium">
          <Image src={CartIcon} alt="" width={30} />
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
