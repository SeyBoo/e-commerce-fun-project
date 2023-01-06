import React, { FunctionComponent, PropsWithChildren } from "react";
import { motion } from "framer-motion";

interface FromTheLeftAnimationProps {
  delay?: number;
}

export const FromTheLeftAnimation: FunctionComponent<
  PropsWithChildren<FromTheLeftAnimationProps>
> = ({ children, delay = 0.25 }) => {
  return (
    <motion.div
      className="w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{
        type: "spring",
        duration: 1.5,
        delay: delay,
      }}
      variants={{
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -100 },
      }}
    >
      {children}
    </motion.div>
  );
};
