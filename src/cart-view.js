/**
 * HTML của giỏ hàng — tách riêng khỏi main.js để test được
 * không cần dựng DOM (giống search.js).
 *
 * Mọi hàm ở đây đều thuần: nhận dữ liệu, trả về chuỗi HTML.
 * main.js chỉ ghép chuỗi này vào #ui-root rồi xử lý sự kiện.
 */

const money = (n) => `${Number(n || 0).toLocaleString('vi-VN')}đ`

const escape = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/** Chỉ nhận màu hex để không mở lỗ XSS qua inline style. */
const tint = (color) => (/^#[0-9a-fA-F]{6}$/.test(String(color ?? '')) ? `${color}1f` : '')

const qtyOf = (line) => Math.max(1, Math.floor(Number(line.qty) || 1))

/**
 * Tính toàn bộ số liệu giỏ trong 1 lần quét duy nhất.
 * main.js không nên gọi cart.count()/subtotal()/total() liên tiếp vì mỗi
 * hàm lại dựng lại cả danh sách món từ localStorage.
 */
export const summarize = (lines, { freeShipFrom = 0, shipFee = 0 } = {}) => {
  const rows = Array.isArray(lines) ? lines : []
  const count = rows.reduce((sum, l) => sum + qtyOf(l), 0)
  const subtotal = rows.reduce((sum, l) => sum + (Number(l.price) || 0) * qtyOf(l), 0)
  const shipping = subtotal === 0 || subtotal >= freeShipFrom ? 0 : shipFee
  return {
    kinds: rows.length,
    count,
    subtotal,
    shipping,
    total: subtotal + shipping,
    missing: Math.max(0, freeShipFrom - subtotal),
  }
}

const lineArt = (line) => {
  if (line.image) {
    return `<img class="cart-line-art" src="${escape(line.image)}" alt="" loading="lazy" />`
  }
  const background = tint(line.accent)
  return `<span class="cart-line-art is-emoji"${
    background ? ` style="background:${background}"` : ''
  }>${escape(line.emoji ?? '🍽️')}</span>`
}

const qtyControls = (line, qty, maxQty, editable) => {
  if (!editable) {
    /* Form thanh toán chỉ xem: cho phép sửa ở đó sẽ mất dữ liệu khách đã nhập. */
    return `<span class="qty is-static">
      <span class="qty-value">${qty}</span>
    </span>`
  }

  const atMax = qty >= maxQty
  const dropHint = qty === 1 ? 'title="Bấm để bỏ món khỏi giỏ"' : ''
  return `<span class="qty${atMax ? ' is-max' : ''}">
    <button type="button" class="qty-btn" data-qty="-1" data-key="${escape(line.key)}" ${
      dropHint
    } aria-label="Giảm số lượng ${escape(line.name)}">−</button>
    <span class="qty-value">${qty}</span>
    <button type="button" class="qty-btn" data-qty="1" data-key="${escape(line.key)}"${
      atMax ? ' disabled title="Tối đa ' + maxQty + ' phần mỗi món"' : ''
    } aria-label="Tăng số lượng ${escape(line.name)}">+</button>
  </span>`
}

/** Một dòng món trong giỏ hàng. */
export const cartLineRow = (line, { maxQty = 20, editable = true } = {}) => {
  const qty = qtyOf(line)
  return `
    <div class="cart-line" data-key="${escape(line.key)}">
      ${lineArt(line)}
      <div class="cart-line-main">
        <strong>${escape(line.name)}</strong>
        <small>${money(line.price)} / món</small>
        ${line.description ? `<span class="cart-line-desc">${escape(line.description)}</span>` : ''}
      </div>
      ${qtyControls(line, qty, maxQty, editable)}
      <span class="cart-line-total">${money((Number(line.price) || 0) * qty)}</span>
      ${
        editable
          ? `<button type="button" class="cart-remove" data-remove="${escape(
              line.key,
            )}" aria-label="Xoá ${escape(line.name)}">✕</button>`
          : ''
      }
    </div>`
}

export const cartLines = (lines, options = {}) =>
  (Array.isArray(lines) ? lines : []).map((line) => cartLineRow(line, options)).join('')

export const cartEmptyHtml = () => `
  <div class="cart-empty">
    <span class="cart-empty-mark" aria-hidden="true">🛒</span>
    <p>Giỏ hàng đang trống.</p>
    <small class="muted">Chọn món ngon ở thực đơn rồi bấm “Đặt ngay” nhé.</small>
  </div>`

/** Thanh tiến trình miễn phí giao, chỉ hiện khi giỏ đã có món. */
export const shipProgressHtml = ({ subtotal = 0, missing = 0, freeShipFrom = 0 } = {}) => {
  if (subtotal <= 0 || freeShipFrom <= 0) return ''
  const pct = Math.min(100, Math.round((subtotal / freeShipFrom) * 100))
  return `
    <div class="ship-progress">
      <div class="ship-bar"><span style="width:${pct}%"></span></div>
      <p class="ship-text">${
        missing > 0
          ? `Mua thêm <b>${money(missing)}</b> để được miễn phí giao`
          : '🎉 Đơn hàng này được <b>miễn phí giao</b>'
      }</p>
    </div>`
}

/** Bảng tạm tính / giao hàng / tổng cộng. */
export const cartSummaryHtml = (sum) => `
  <div class="cart-sum"><span>Tạm tính (${sum.kinds} món)</span><b>${money(sum.subtotal)}</b></div>
  <div class="cart-sum"><span>Giao hàng</span><b>${sum.shipping ? money(sum.shipping) : 'Miễn phí'}</b></div>
  <div class="cart-sum is-total"><span>Tổng cộng</span><b>${money(sum.total)}</b></div>`