"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import PageTransition from "@/components/PageTransition";

export default function ClientAnimatePresence(props: {
  children: React.ReactNode;
}) {
  // const pathname = usePathname();
  return (
    <AnimatePresence initial={false} mode={"wait"}>
      {/*<PageTransition key={pathname}>*/}
      {props.children}
      {/*</PageTransition>*/}
    </AnimatePresence>
  );
}
