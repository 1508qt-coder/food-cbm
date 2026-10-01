import { webcrypto } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')

export const foodsRaw = JSON.parse(readFileSync(resolve(root, 'src/data/foods.json'), 'utf8'))

class MemoryStorage {
  constructor() {
    this.map = new Map()
  }

  getItem(key) {
    return this.map.has(key) ? this.map.get(key) : null
  }

  setItem(key, value) {
    this.map.set(key, String(value))
  }

  removeItem(key) {
    this.map.delete(key)
  }

  clear() {
    this.map.clear()
  }

  key(i) {
    return [...this.map.keys()][i] ?? null
  }

  get length() {
    return this.map.size
  }
}

export const STORAGE = new MemoryStorage()
globalThis.localStorage = STORAGE
if (!globalThis.crypto?.subtle) globalThis.crypto = webcrypto

/**
 * store.js chỉ được nạp MỘT lần cho cả file test, nên các test chỉ cần
 * xoá localStorage + nạp lại danh sách món thay vì cache-bust module.
 */
export const store = await import('../src/store.js')

export const freshSeed = async () => {
  STORAGE.clear()
  store.resetDishes()
  return { store }
}