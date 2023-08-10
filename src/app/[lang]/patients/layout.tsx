/*
    this component will have the follwing structure:
    <ContextProvider>
        <Map/>// this will be a full screen map
        <Floating className={"h-full w-[600px] p-5 left-0"}>
            <Layout>
                <Nav/>
                {children}
            <Layout/>
        <Floating/>
        <Floating>
            <MapButton>
                Clinure for Researchers
                <Arrow/>
            </MapButton>
        </Floating>
        <Floating>
            <MapControls/>
        </Floating>

   </ContextProvider>
 */

// for now we'll create this structure using div or fragments instead of the components and add them gradually
import Map from "@/components/map/Map";
import React from "react";
import ClientAnimatePresence from "@/components/AnimatePresence";
import Navbar from "@/components/Navbar";
import Floating from "@/app/[lang]/patients/components/Floating";
import MainLayout from "@/app/[lang]/patients/components/MainLayout";
import LinkToResearchers from "@/app/[lang]/patients/components/LinkToResearchers";
import MapControls from "@/components/map/MapControls";
import {
  FilterContextProvider as FilterProvider,
  FilterStateDebugger,
} from "@/lib/filters";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <FilterProvider>
      <Map />
      <Floating
        className={
          "top-0 left-0 w-fit h-screen flex flex-row justify-start items-end gap-2"
        }
      >
        <MainLayout>{children}</MainLayout>
        <MapControls />
      </Floating>
      <Floating className={"top-0 right-0 "}>
        <LinkToResearchers />
      </Floating>
      {/*<FilterStateDebugger />*/}
    </FilterProvider>
  );
}
