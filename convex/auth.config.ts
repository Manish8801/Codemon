import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      domain: "https://glad-elephant-80.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
