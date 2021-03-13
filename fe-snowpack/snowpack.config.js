// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration
process.env.ENV = "dev";

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  extends: "@snowpack/app-scripts-svelte",
  mount: {
    public: { url: "/", static: true },
    src: "/_dist_",
  },
  alias: {
    components: "./src/components",
    constants: "./src/constants",
    directives: "./src/directives",
    helpers: "./src/helpers",
    lib: "./src/lib",
    pages: "./src/pages",
    stores: "./src/stores",
    svg: "./src/svg",
    types: "./src/types",
    config: "./src/config",
  },
  plugins: [
    [
      "@snowpack/plugin-build-script",
      { cmd: "postcss", input: [".css"], output: [".css"] },
    ],
    "@snowpack/plugin-typescript",
  ],
  packageOptions: {
    installTypes: true,
    polyfillNode: true,
  },
  devOptions: {
    port: 4200,
  },
  buildOptions: {
    clean: true,
    env: {
      env: process.env,
    },
  },
  optimize: {
    bundle: true,
    minify: true,
    treeshake: true,
    target: "es2020",
  },
};
