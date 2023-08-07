"use client";

import cubejs from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import { ReactNode } from "react";

export const cubeJsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTE0OTMwMjB9.Q5YiWLWuggMXFT_wLKvxBRWmJcD75dfTc66KW9ut7Bg",
  {
    apiUrl:
      "https://peach-salamander.aws-us-east-1.cubecloudapp.dev/dev-mode/dev-mahdichaari01-c11e4b35/cubejs-api/v1",
  },
);

export default function CP({ children }: { children: ReactNode }) {
  return <CubeProvider cubejsApi={cubeJsApi}>{children}</CubeProvider>;
}
