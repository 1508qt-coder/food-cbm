import * as db from './store.js'

const CART_KEY = 'cbmfood.cart'
/** UI cần biết trần này để khoá nút "+", nên phải export ra ngoài. */
export const MAX_QTY = 20

const read = () => {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

let lines = read().filter((l) => l && typeof l.key === 'string')

const persist = () => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(lines))
  } catch {
    /* storage đầy hoặc bị chặn, giỏ vẫn dùng được trong phiên này */
  }
}

const rebuild = () =>
  lines
    .map((line) => {
      const dish = db.findDish(line.key)
      if (!dish || dish.status === 'unavailable') return null
      const qty = Math.min(MAX_QTY, Math.max(1, Math.floor(Number(line.qty) || 1)))
      return {
        key: dish.code,
        name: dish.name,
        description: dish.description,
        price: dish.price,
        qty,
        image: dish.image,
        emoji: dish.emoji,
        accent: dish.accent,
      }
    })
    .filter(Boolean)

export const list = () => rebuild()

export const count = () => rebuild().reduce((sum, l) => sum + l.qty, 0)

export const subtotal = () => rebuild().reduce((sum, l) => sum + l.price * l.qty, 0)

export const shipping = () => {
  const sub = subtotal()
  if (sub === 0) return 0
  return sub >= db.FREE_SHIP_FROM ? 0 : db.SHIP_FEE
}

export const total = () => subtotal() + shipping()

export const missingForFreeShip = () => Math.max(0, db.FREE_SHIP_FROM - subtotal())

/** Số lượng của một dòng, 0 nếu món không còn trong giỏ. */
export const qtyOf = (key) => rebuild().find((l) => l.key === key)?.qty ?? 0

export const add = (key, qty = 1) => {
  const dish = db.findDish(key)
  if (!dish) return { error: 'not-found' }
  if (dish.status === 'unavailable') return { error: 'unavailable' }

  /* Không dùng `Number(qty) || 1`: biểu thức đó nuốt mất qty = 0 và biến
     yêu cầu "không thêm gì" thành thêm 1 món. */
  const rawQty = Number(qty)
  if (!Number.isFinite(rawQty)) return { error: 'invalid-qty' }
  const amount = Math.floor(rawQty)
  if (amount < 1) return { error: 'invalid-qty' }

  const existing = lines.find((l) => l.key === dish.code)
  if (existing) {
    existing.qty = Math.min(MAX_QTY, existing.qty + amount)
  } else {
    lines = [...lines, { key: dish.code, qty: Math.min(MAX_QTY, amount) }]
  }
  persist()
  return { ok: true, lines: list(), count: count() }
}

export const setQty = (key, qty) => {
  const rawQty = Number(qty)
  if (!Number.isFinite(rawQty)) return { error: 'invalid-qty' }
  const amount = Math.floor(rawQty)
  if (amount < 1) return remove(key)
  const line = lines.find((l) => l.key === key)
  if (!line) return { error: 'not-found' }
  line.qty = Math.min(MAX_QTY, amount)
  persist()
  return { ok: true, lines: list(), count: count() }
}

export const remove = (key) => {
  const before = lines.length
  lines = lines.filter((l) => l.key !== key)
  if (lines.length === before) return { error: 'not-found' }
  persist()
  return { ok: true, lines: list(), count: count() }
}

/**
 * Tăng/giảm số lượng theo bước cho một dòng giỏ hàng.
 * - `delta` dương tăng, âm giảm; bước bị cắt bỏ phần thập lân.
 * - Tăng vượt MAX_QTY thì giữ nguyên số cũ và báo `atMax` để UI khoá nút "+".
 * - Giảm về 0 thì xoá dòng và báo `removed` kèm qty cũ, đủ để UI báo "Hoàn tác".
 */
export const changeQty = (key, delta) => {
  const rawStep = Number(delta)
  if (!Number.isFinite(rawStep) || Math.trunc(rawStep) === 0) return { error: 'invalid-qty' }
  const step = Math.trunc(rawStep)

  const line = rebuild().find((l) => l.key === key)
  if (!line) return { error: 'not-found' }

  const next = line.qty + step
  if (next > MAX_QTY) {
    return { ok: true, atMax: true, qty: MAX_QTY, lines: list(), count: count() }
  }
  if (next < 1) {
    return { ...remove(key), removed: true, name: line.name, qty: line.qty }
  }

  return { ...setQty(key, next), atMax: next >= MAX_QTY, qty: next }
}

export const clear = () => {
  lines = []
  persist()
  return { ok: true, lines: [], count: 0 }
}

export const syncWithMenu = () => {
  const valid = new Set(db.listActiveDishes().map((d) => d.code))
  lines = lines.filter((l) => valid.has(l.key))
  persist()
}