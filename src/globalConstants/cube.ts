import cubejs from "@cubejs-client/core";

export const cubeJsApi = cubejs(process.env.NEXT_CUBEJS_API_SECRET as string, {
  apiUrl: process.env.NEXT_CUBEJS_API_URL as string,
});
