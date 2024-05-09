import { DOM_ATTR, OPEN_CODE_API } from './constant'

/**
 * 请求打开代码编辑器
 * @param filePathId 页面元素代码路径 hash id
 * @param componentFilePathId 页面元素对应的组件文件路径 hash id
 */
const requestService = (filePathId, componentFilePathId) => {
  const { origin } = window.location
  fetch(`${origin}${OPEN_CODE_API}?filePathId=${filePathId}&componentFilePathId=${componentFilePathId}`).catch((error) => {
    console.error('dom-to-code: ', error)
  })
}

/**
 * 获取页面元素代码路径 hash id
 * @param element 页面元素
 * @returns 页面元素代码路径信息
 */
function getFilePathId(element) {
  if (!element || !element.getAttribute) return null
  if (element.getAttribute(DOM_ATTR)) return element.getAttribute(DOM_ATTR)
    

  return getFilePathId(element.parentNode)
}

/**
 * 根据页面元素获取组件文件路径 hash id
 * @param dom 页面元素
 * @returns 返回组件对应的路径
 */
function findComponentFilePathIdByDom(dom) {
  // Host Element
  if (dom.getAttribute(DOM_ATTR))
    return dom.getAttribute(DOM_ATTR)

  // Vue3 Component
  if (dom.__vnode) {
    let vComponent = dom.__vueParentComponent
    while (vComponent && !vComponent.attrs[DOM_ATTR]) vComponent = vComponent.parent
    if (vComponent)
      return vComponent.attrs[DOM_ATTR]
  }

  // Vue2 Component
  let vComponent = null
  let el = dom
  while (!el.__vue__ && el.parentElement) el = el.parentElement
  vComponent = el.__vue__

  if (vComponent) {
    while (vComponent && !vComponent.$attrs[DOM_ATTR]) vComponent = vComponent.$parent
    if (vComponent)
      return vComponent.$attrs[DOM_ATTR]
  }

  return getFilePathId(dom)
}

/**
 * 初始化 dom-to-code
 */
export function initDomOpenCode() {
  let keyCode = ''

  document.addEventListener('keydown', (e) => {
    keyCode = e.key
  })

  document.addEventListener('mousedown', (e) => {
    if ((e.button === 1 || e.button === 2) && (keyCode === 'Control' || keyCode === 'Meta')) {
      e.stopImmediatePropagation()
      e.preventDefault()
      e.stopPropagation()
      console.log('dom-to-code: open editor.')
      const filePathId = getFilePathId(e.target)
      const componentFilePathId = findComponentFilePathIdByDom(e.target)
      filePathId && requestService(filePathId, componentFilePathId)
      keyCode = ''
    }
  }, true)
}
