"use client";

import { PropsWithChildren, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
export default function PageTransition(
  props: PropsWithChildren<{
    className?: string;
    fromLeft?: boolean;
    key: string;
  }>,
) {
  return (
    <motion.div
      key={props.key}
      className={`w-full h-full  overflow-hidden ${props.className} `}
      transition={{
        type: "just",
      }}
      initial={{
        x: "100%",
      }}
      animate={{
        x: 0,
      }}
      exit={{
        x: "-100%",
      }}
    >
      {props.children}
    </motion.div>
  );
}
