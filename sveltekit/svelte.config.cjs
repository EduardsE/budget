const sveltePreprocess = require("svelte-preprocess");
const node = require("@sveltejs/adapter-node");
const pkg = require("./package.json");
const path = require("path");

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    sveltePreprocess({
      defaults: {
        style: "postcss",
      },
      postcss: true,
    }),
  ],
  kit: {
    // By default, `npm run build` will create a standard Node app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    adapter: node(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",

    vite: {
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {}),
      },
      resolve: {
        alias: {
          components: path.resolve(__dirname, "src/components"),
          constants: path.resolve(__dirname, "src/constants"),
          directives: path.resolve(__dirname, "src/directives"),
          helpers: path.resolve(__dirname, "src/helpers"),
          lib: path.resolve(__dirname, "src/lib"),
          pages: path.resolve(__dirname, "src/pages"),
          stores: path.resolve(__dirname, "src/stores"),
          svg: path.resolve(__dirname, "src/svg"),
          types: path.resolve(__dirname, "src/types"),
          config: path.resolve(__dirname, "src/config"),
          images: path.resolve(__dirname, "src/images"),
        },
      },
    },
  },
};
