import { transformVue } from './core/vue'

/**
 * webpack loader
 */
export default async function (source) {
  const result = await transformVue(source, this.resourcePath)
  return typeof result === 'string' ? result : ((result)?.code || '')
}
