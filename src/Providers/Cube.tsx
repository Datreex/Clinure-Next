"use client";

import cubejs from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import { ReactNode } from "react";
import { cubeJsApi } from "@/globalConstants/cube";

export default function CP({ children }: { children: ReactNode }) {
  return <CubeProvider cubejsApi={cubeJsApi}>{children}</CubeProvider>;
}
