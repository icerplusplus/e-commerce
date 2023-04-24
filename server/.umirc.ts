import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],

  npmClient: "yarn",
  dva: {},
  plugins: ["@umijs/plugins/dist/dva"],
});
