import commonjs from "@rollup/plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import html from "@rollup/plugin-html";
import alias from "@rollup/plugin-alias";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import path from "path";
import image from "svelte-image";
import copy from "rollup-plugin-copy";

import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";

const isDev = true;

export default [
  {
    input: "src/main.ts",
    output: {
      sourcemap: true,
      format: "iife",
      name: "app",
      file: "public/bundle.js",
    },
    plugins: [
      copy({
        targets: [{ src: "./src/images", dest: "./public" }],
      }),

      svelte({
        preprocess: sveltePreprocess({
          ...image({ publicDir: "./public" }),
          postcss: postcss({
            plugins: [tailwindcss, autoprefixer],
          }),
        }),

        // Extract CSS into a single bundled file (recommended).
        // See note below
        css: function (css) {
          // creates `main.css` and `main.css.map`
          // using a falsy name will default to the bundle name
          // — pass `false` as the second argument if you don't want the sourcemap
          css.write("main.css");
        },
      }),

      alias({
        entries: [
          {
            find: "components",
            replacement: path.resolve(__dirname, "src/components"),
          },
          {
            find: "constants",
            replacement: path.resolve(__dirname, "src/constants"),
          },
          {
            find: "gql",
            replacement: path.resolve(__dirname, "src/gql"),
          },
          {
            find: "stores",
            replacement: path.resolve(__dirname, "src/stores"),
          },
          {
            find: "types",
            replacement: path.resolve(__dirname, "src/types"),
          },
          {
            find: "pages",
            replacement: path.resolve(__dirname, "src/pages"),
          },
          {
            find: "svg",
            replacement: path.resolve(__dirname, "src/svg"),
          },
          {
            find: "directives",
            replacement: path.resolve(__dirname, "src/directives"),
          },
        ],
      }),

      resolve({
        browser: true,
        dedupe: ["svelte"],
      }),

      // A Rollup plugin to convert CommonJS modules to ES6, so they can be
      // included in a Rollup bundle
      commonjs(),

      typescript({
        sourceMap: isDev,
        inlineSources: isDev,
      }),

      // To create index.html in public
      html({
        publicPath: "/",
      }),

      livereload({
        watch: "public/bundle.js",
        delay: 200,
      }),
    ],
  },
];
