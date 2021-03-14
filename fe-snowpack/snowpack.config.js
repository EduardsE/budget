// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration
process.env.ENV = "dev";

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  extends: "@snowpack/app-scripts-svelte",
  mount: {
    public: { url: "/" },
    src: "/_dist_",
  },
  routes: [
    { "match": "routes", "src": ".*", "dest": "/index.html" }
  ],
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
    images: "./src/images",
  },
  plugins: [
    [
      "@snowpack/plugin-build-script",
      { cmd: "postcss", input: [".css"], output: [".css"] },
    ],
    "@snowpack/plugin-typescript",
    "snowpack-plugin-relative-css-urls",
    '@snowpack/plugin-sass',
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
