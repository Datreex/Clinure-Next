import Navbar from "@/components/Navbar";
import React from "react";

export default function MainLayout(props: { children: React.ReactNode }) {
  return (
    <div
      className={
        "h-full w-[450px] bg-white py-3 px-2 rounded-xl shadow-lg overflow-hidden flex flex-col"
      }
    >
      <Navbar />
      <div
        className={
          "w-full h-full overflow-x-hidden overflow-y-scroll cleanScrollbar relative"
        }
      >
        {props.children}
      </div>
    </div>
  );
}
