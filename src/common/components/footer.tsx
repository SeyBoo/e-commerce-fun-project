import { FunctionComponent } from "react";
import Image from "next/image";
import Logo from "../assets/logo-white.svg";
import { useGetAllCategories } from "../../module/category/api/category.api";
import Link from "next/link";

const Footer: FunctionComponent = () => {
  const { data, status } = useGetAllCategories();

  return (
    <footer className="bg-[#272727]">
      <div className="bg-[#272727] text-white flex flex-col justify-between gap-6 p-6 md:flex-row md:max-w-7xl md:m-auto">
        <div>
          <Image src={Logo} alt="logo" width={225} />
          <p>E-Commerce website training created by Antoine Chevalier.</p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-[#56b280] font-semibold">Discovery</h3>
          <ol className="flex flex-col gap-1">
            {data?.map((category, index) => (
              <li key={index} className="capitalize">
                <Link href={`/category/${category}`}>{category}</Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
