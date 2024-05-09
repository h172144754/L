import { createFilter } from '@rollup/pluginutils'
import { createUnplugin } from "unplugin";
import { transformVue } from "./core/vue";
import { pathResolve, resolveOption } from "./core/helper";
import { launchEditorMiddlewareForVite } from "./core/middleware";

export default createUnplugin((userOptions = {}, meta) => {
  // 配置选项
  const options = resolveOption(userOptions);

  // 构建过滤器
  const filter = createFilter(options.include, options.exclude)

  return {
    name: "unplugin-dom-open-code",
    apply: "serve",
    enforce: "pre",

    transformInclude(id) {
      // 因为 webpack 的 transform 没能覆盖原有代码，所以 webpack 不走 transform, 走 loaders
      if (meta.framework === 'webpack')
        return false

      return filter(id)
    },

    transform(code, id) {
      try {
        return transformVue(code, id);
      } catch (e) {
        this.error(e);
      }
    },

    vite: {
      configureServer(server) {
        server.middlewares.use(launchEditorMiddlewareForVite);
      },
    },

    webpack(compiler) {
      // 使用 loaders 转换代码
      compiler.options.module.rules.push({
        test: options.include,
        use: [
          {
            loader: pathResolve("../webpackLoader.cjs"),
            options: {
              ...options,
            },
          },
        ],
      });

      if (!compiler.options.devServer) compiler.options.devServer = {};
    },
  };
});



