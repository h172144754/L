import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/unplugin", "src/vite", "src/index", "src/webpack", "src/webpackLoader", "src/esbuild", "src/rollup"],
  externals: ["esbuild", "webpack", "rollup", "vite", "nuxt"],
  clean: true,
  rollup: {
    emitCJS: true,
    cjsBridge: true,
  },
});
