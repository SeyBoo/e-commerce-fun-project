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
import SearchProduct from "../../module/products/components/searchProduct";
import MenuDropDown from "./animations/menu";

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
    <nav className="flex items-center justify-between p-5">
      <div className="flex xl:gap-20 gap-10 items-center">
        <Link href="/">
          <Image src={Logo} alt="logo" width={225} />
        </Link>
        <div className="hidden md:flex gap-6 font-medium ">
          <PopOverPanel triggerButton="Categories" panelItems={panelItems} />
          <Link href="#">Deals</Link>
          <Link href="#">What&apos;s news</Link>
          <Link href="#">Delivery</Link>
        </div>
      </div>
      <MenuDropDown
        sections={[
          {
            items: [
              {
                children: <SearchProduct />,
              },
              {
                children: (
                  <PopOverPanel
                    triggerButton="Categories"
                    panelItems={panelItems}
                  />
                ),
              },
              {
                children: <Link href="#">Deals</Link>,
                activeStyle: true,
              },
              {
                children: <Link href="#">What&apos;s new</Link>,
                activeStyle: true,
              },
              {
                children: <Link href="#">Delivery</Link>,
                activeStyle: true,
              },
            ],
          },
          {
            items: [
              {
                children: (
                  <Link
                    href="/login"
                    className="flex items-center gap-1 font-medium"
                  >
                    <Image src={AccountIcon} alt="" width={30} />
                    Account
                  </Link>
                ),
                activeStyle: true,
              },
              {
                children: (
                  <Link
                    href="/cart"
                    className="flex items-center gap-1 font-medium"
                  >
                    <Image src={CartIcon} alt="" width={30} />
                    Cart
                  </Link>
                ),
                activeStyle: true,
              },
            ],
          },
        ]}
      />
      <div className="hidden md:flex items-center gap-6 w-max">
        <div className="w-[350px]">
          <SearchProduct />
        </div>
        <Link href="/login" className="flex items-center gap-1 font-medium">
          <Image src={AccountIcon} alt="" width={30} />
          <p className="hidden xl:block">Account</p>
        </Link>
        <Link href="/cart" className="flex items-center gap-1 font-medium">
          <Image src={CartIcon} alt="" width={30} />
          <p className="hidden xl:block">Cart</p>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
