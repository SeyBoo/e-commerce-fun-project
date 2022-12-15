import React, { FunctionComponent, PropsWithChildren } from "react";
import { motion } from "framer-motion";

interface FromTheTopAnimationProps {
  delay: number;
}

export const FromTheTopAnimation: FunctionComponent<
  PropsWithChildren<FromTheTopAnimationProps>
> = ({ children, delay = 0.25 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
        delay: delay,
      }}
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
    >
      {children}
    </motion.div>
  );
};
