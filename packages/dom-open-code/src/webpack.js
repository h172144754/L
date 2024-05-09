import { launchEditorMiddleware } from './core/middleware'
import unplugin from './unplugin'

/**
 * 专门给 vue-cli  <= 4 用的 devServer 配置
 */
export const domOpenCodeDevServerV4 = {
  // for webpack 4
  before: (app) => {
    app.use(launchEditorMiddleware)
  },
}

/**
 * 专门给 vue-cli  >= 5 用的 devServer 配置，
 * 为什么不和上面合到一起，是因为 webpack 5 已经移除 before 这个 api 了。
 * 所以会报错，项目都跑不起来，所以只能分开写
 */
export const domOpenCodeDevServerV5 = {
  // for webpack 5
  setupMiddlewares: (middlewares) => {
    return [launchEditorMiddleware, ...middlewares]
  },
}

export const domOpenCodePlugin = unplugin.webpack

