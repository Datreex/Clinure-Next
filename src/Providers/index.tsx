"use client";
import ThemeRegistry from "@/Providers/ThemeRegisty";
import CubeProvider from "./Cube";
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CubeProvider>
      <ThemeRegistry options={{ key: "joy" }}> {children}</ThemeRegistry>
    </CubeProvider>
  );
};
