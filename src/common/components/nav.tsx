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
import SearchProducts from "../../module/products/components/searchProducts";
import MenuDropDown from "./animations/menu";
import { useGetAllProducts } from "../../module/products/api/products.api";
import { useAppSelector } from "../hooks/store";

const panelItems: PanelItem[] = [
  {
    name: "Electronics",
    image: ElectronicsIcon,
  },
  {
    name: "Jewelery",
    image: DiamondIcon,
  },
  {
    name: "Men's clothing",
    image: ManIcon,
  },
  {
    name: "Women's clothing",
    image: WomanIcon,
  },
];

const Nav: FunctionComponent = () => {
  const { data: productsData } = useGetAllProducts();
  const productsCount = useAppSelector((state) => state.cart.productsCount);

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
                children: <SearchProducts data={productsData} />,
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
                isActiveStyle: true,
              },
              {
                children: <Link href="#">What&apos;s new</Link>,
                isActiveStyle: true,
              },
              {
                children: <Link href="#">Delivery</Link>,
                isActiveStyle: true,
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
                isActiveStyle: true,
              },
              {
                children: (
                  <Link
                    href="/cart"
                    className="flex items-center gap-1.5 font-medium"
                  >
                    <div className="inline-flex relative items-center text-sm font-medium text-center rounded-lg">
                      <Image src={CartIcon} alt="cart-icon" width={30} />
                      <div className="inline-flex absolute -top-2 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-green-700 rounded-full">
                        {productsCount}
                      </div>
                    </div>
                    <p>Cart</p>
                  </Link>
                ),
                isActiveStyle: true,
              },
            ],
          },
        ]}
      />
      <div className="hidden md:flex items-center gap-6 w-max">
        <div className="w-[350px]">
          <SearchProducts data={productsData} />
        </div>
        <Link href="/login" className="flex items-center gap-1 font-medium">
          <Image src={AccountIcon} alt="" width={30} />
          <p className="hidden xl:block">Account</p>
        </Link>
        <Link href="/cart" className="flex items-center gap-1 font-medium">
          <div className="inline-flex relative items-center p-1 text-sm font-medium text-center text-white rounded-lg">
            <Image src={CartIcon} alt="cart-icon" width={30} />
            <div className="inline-flex absolute -top-1 -right-1 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-green-700 rounded-full">
              {productsCount}
            </div>
          </div>
          <p className="hidden xl:block">Account</p>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
