import fs from 'fs'
import path from 'path'
import { debounce } from './helper'

export class FileStorage {

  constructor(options) {
    this.storageFilePath = options.storageFilePath

    // 确保文件夹存在
    const storageFileDirPath = path.dirname(this.storageFilePath)
    if (!fs.existsSync(storageFileDirPath))
      fs.mkdirSync(storageFileDirPath, { recursive: true })

    // 确保文件存在
    if (!fs.existsSync(this.storageFilePath))
      fs.writeFileSync(this.storageFilePath, '{}', 'utf8')

    this.map = this.#jsonParse(fs.readFileSync(this.storageFilePath, 'utf8'))
  }

  #jsonParse(str) {
    try {
      return JSON.parse(str)
    }
    catch (error) {
      return {}
    }
  }

  /**
   * 将 map 写入文件
   */
  #saveMap() {
    fs.writeFileSync(this.storageFilePath, JSON.stringify(this.map), 'utf8')
  }

  /**
   * 防抖地将 map 写入文件，减少磁盘频繁读写
   */
  #saveMapDebounce = debounce(this.#saveMap, 500)

  setItem(key, value) {
    this.map[key] = value ?? ''
    this.#saveMapDebounce()
  }

  getItem(key) {
    return this.map[key] ?? null
  }

  removeItem(key) {
    delete this.map[key]
    this.#saveMapDebounce()
  }

  clear(){
    this.map = {}
    this.#saveMapDebounce()
  }

  key(index) {
    return Object.keys(this.map)[index] ?? null
  }
}

export const cachePath = path.resolve(process.cwd(), './node_modules/.cache/dom-to-code')
export const createCachePath = (filePath) => path.resolve(cachePath, filePath)

export const filePathHashMapStorage = new FileStorage({ storageFilePath: createCachePath('./FILE_PATH_HASH_MAP.json') })

