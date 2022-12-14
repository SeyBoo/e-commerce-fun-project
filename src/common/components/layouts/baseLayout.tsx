import { FunctionComponent, PropsWithChildren } from "react";
import Nav from "../nav";

const BaseLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Nav />
      <main className="w-[90%] m-auto">{children}</main>
    </>
  );
};

export default BaseLayout;
