import React, { FunctionComponent, PropsWithChildren } from "react";
import { motion } from "framer-motion";

export const ZoomOnHover: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <motion.div
      initial="hidden"
      viewport={{ once: true }}
      whileHover={{
        scale: 1.05,
        transition: {
          type: "spring",
          bounce: 0.4,
          duration: 0.5,
          delay: 0.05,
        },
      }}
    >
      {children}
    </motion.div>
  );
};
