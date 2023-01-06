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

const categoriesPanel: PanelItem[] = [
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


  const renderSignInButton = () => {
    const DefaultContent = () => (
      <>
        <Image src={AccountIcon} alt="account-icon" width={30} />
        <p className="md:hidden xl:block">Account</p>
      </>
    );

    return (
      <Link href="/auth/signin" className="flex items-center gap-1 font-medium">
        <DefaultContent />
      </Link>
    );
  };

  const renderCart = () => {
    return (
      <Link href="/cart" className="flex items-center gap-1 font-medium">
        <div className="inline-flex relative items-center p-1 text-sm font-medium text-center text-white rounded-lg">
          <Image src={CartIcon} alt="cart-icon" width={30} />
          {productsCount !== 0 && (
            <div className="inline-flex absolute -top-1 -right-1 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-green-700 rounded-full">
              {productsCount}
            </div>
          )}
        </div>
        <p className="md:hidden xl:block">Cart</p>
      </Link>
    );
  };

  const renderMobileMenu = () => {
    return (
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
                    panelItems={categoriesPanel}
                    showDropDownIcon
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
                children: renderSignInButton(),
                isActiveStyle: true,
              },
              {
                children: renderCart(),
                isActiveStyle: true,
              },
            ],
          },
        ]}
      />
    );
  };

  return (
    <nav className="flex items-center justify-between p-5">
      <div className="flex xl:gap-20 gap-10 items-center">
        <Link href="/">
          <Image src={Logo} alt="logo" width={225} />
        </Link>
        <div className="hidden md:flex gap-6 font-medium ">
          <PopOverPanel
            triggerButton="Categories"
            panelItems={categoriesPanel}
            showDropDownIcon
          />
          <Link href="#">Deals</Link>
          <Link href="#">What&apos;s news</Link>
          <Link href="#">Delivery</Link>
        </div>
      </div>
      {renderMobileMenu()}
      <div className="hidden md:flex items-center gap-6 w-max">
        <div className="w-[350px]">
          <SearchProducts data={productsData} />
        </div>
        {renderSignInButton()}
        {renderCart()}
      </div>
    </nav>
  );
};

export default Nav;
