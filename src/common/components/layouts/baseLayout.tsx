import { FunctionComponent, PropsWithChildren } from "react";
import Nav from "../nav";

const BaseLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="max-w-[1860px] m-auto">
      <Nav />
      <main className="w-[90%] m-auto">{children}</main>
    </div>
  );
};

export default BaseLayout;
