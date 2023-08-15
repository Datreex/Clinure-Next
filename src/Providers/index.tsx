"use client";
import ThemeRegistry from "@/Providers/ThemeRegisty";
// import CubeProvider from "./Cube";
import ReactQueryProvider from "@/Providers/react-query";
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <ThemeRegistry options={{ key: "joy" }}> {children}</ThemeRegistry>
    </ReactQueryProvider>
  );
};
