import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/unplugin", "src/vite", "src/index", "src/webpack", "src/webpackLoader"],
  externals: ["esbuild", "webpack", "rollup", "vite", "nuxt", "vue"],
  clean: true,
  rollup: {
    emitCJS: true,
    cjsBridge: true,
  },
});
