"use client";

import cubejs from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import { ReactNode } from "react";

export const cubeJsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTE1OTEwMDksImV4cCI6MTY5MTY3NzQwOX0.ACg93SqvNygUvp2M6shJkUvd0lvc98bMDoAV93ep2KY",
  {
    apiUrl: "http://localhost:4000/cubejs-api/v1",
  },
);

export default function CP({ children }: { children: ReactNode }) {
  return <CubeProvider cubejsApi={cubeJsApi}>{children}</CubeProvider>;
}
