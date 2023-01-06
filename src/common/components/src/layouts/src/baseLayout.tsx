import { FunctionComponent, PropsWithChildren } from "react";
import { Footer } from "@common/components";
import { Nav } from "@common/components";

export const BaseLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="max-w-[1860px] m-auto flex flex-col justify-between h-screen gap-6">
      <Nav />
      <main className="w-[90%] m-auto flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
