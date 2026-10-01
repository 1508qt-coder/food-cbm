import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  cartEmptyHtml,
  cartLineRow,
  cartLines,
  cartSummaryHtml,
  shipProgressHtml,
  summarize,
} from '../src/cart-view.js'

const line = (over = {}) => ({
  key: 'MH001',
  name: 'Phở bò đặc biệt',
  description: 'Nước dùng ninh xương 12 tiếng',
  price: 65000,
  qty: 2,
  emoji: '🍜',
  accent: '#e8542d',
  ...over,
})

/* ------------------------- summarize ------------------------- */

test('summarize tinh so mon, tam tinh, ship va tong', () => {
  const sum = summarize([line(), line({ key: 'MH002', price: 35000, qty: 1 })], {
    freeShipFrom: 150000,
    shipFee: 15000,
  })
  assert.equal(sum.kinds, 2)
  assert.equal(sum.count, 3)
  assert.equal(sum.subtotal, 165000)
  assert.equal(sum.shipping, 0, 'qua 150k phai mien ship')
  assert.equal(sum.total, 165000)
  assert.equal(sum.missing, 0)
})

test('summarize cong phi ship khi chua du nguong', () => {
  const sum = summarize([line({ price: 50000, qty: 1 })], {
    freeShipFrom: 150000,
    shipFee: 15000,
  })
  assert.equal(sum.subtotal, 50000)
  assert.equal(sum.shipping, 15000)
  assert.equal(sum.total, 65000)
  assert.equal(sum.missing, 100000)
})

test('summarize gio rong khong thu phi ship', () => {
  const sum = summarize([], { freeShipFrom: 150000, shipFee: 15000 })
  assert.equal(sum.kinds, 0)
  assert.equal(sum.count, 0)
  assert.equal(sum.subtotal, 0)
  assert.equal(sum.shipping, 0)
  assert.equal(sum.total, 0)
})

test('summarize chiu duoc du lieu khong phai mang', () => {
  const sum = summarize(null, { freeShipFrom: 150000, shipFee: 15000 })
  assert.equal(sum.total, 0)
})

/* ------------------------- cartLineRow ------------------------- */

test('cartLineRow hien ten, gia, so luong va thanh tien', () => {
  const html = cartLineRow(line())
  assert.match(html, /data-key="MH001"/)
  assert.match(html, /Phở bò đặc biệt/)
  assert.match(html, /65\.000đ \/ món/)
  assert.match(html, /130\.000đ/)
  assert.match(html, /class="qty-value">2</)
})

test('cartLineRow co du nut tang, giam va xoa', () => {
  const html = cartLineRow(line())
  assert.match(html, /data-qty="-1" data-key="MH001"/)
  assert.match(html, /data-qty="1" data-key="MH001"/)
  assert.match(html, /data-remove="MH001"/)
})

test('cartLineRow khoa nut tang khi cham tran', () => {
  const html = cartLineRow(line({ qty: 20 }), { maxQty: 20 })
  assert.match(html, /class="qty is-max"/)
  assert.match(html, /data-qty="1" data-key="MH001" disabled/)
  assert.match(html, /Tối đa 20 phần mỗi món/)
})

test('cartLineRow o so luong 1 thi goi y bam de bo mon', () => {
  const html = cartLineRow(line({ qty: 1 }))
  assert.match(html, /Bấm để bỏ món khỏi giỏ/)
})

test('cartLineRow che do chi xem thi khong co nut sua', () => {
  const html = cartLineRow(line(), { editable: false })
  assert.doesNotMatch(html, /data-qty/)
  assert.doesNotMatch(html, /data-remove/)
  assert.match(html, /class="qty is-static"/)
  assert.match(html, />2</)
})

test('cartLineRow escape ten mon de tranh XSS', () => {
  const html = cartLineRow(line({ name: '<img src=x onerror=alert(1)>' }))
  assert.doesNotMatch(html, /<img src=x/)
  assert.match(html, /&lt;img src=x/)
})

test('cartLineRow uu tien anh that khi mon co image', () => {
  const html = cartLineRow(line({ image: '/assets/pho.png' }))
  assert.match(html, /<img class="cart-line-art" src="\/assets\/pho.png"/)
  assert.doesNotMatch(html, /is-emoji/)
})

test('cartLineRow dung emoji khi mon khong co anh', () => {
  const html = cartLineRow(line({ image: '', emoji: '🍲', accent: '#2f9e63' }))
  assert.match(html, /class="cart-line-art is-emoji"/)
  assert.match(html, /🍲/)
  assert.match(html, /style="background:#2f9e631f"/)
})

test('cartLineRow bo qua mau accent khong hop le', () => {
  const html = cartLineRow(line({ accent: 'red; background:url(x)' }))
  assert.doesNotMatch(html, /style="background:/)
})

test('cartLines noi nhieu dong lai', () => {
  const html = cartLines([line(), line({ key: 'MH002', qty: 1 })])
  assert.equal((html.match(/class="cart-line"/g) ?? []).length, 2)
})

test('cartEmptyHtml bao gio trong', () => {
  assert.match(cartEmptyHtml(), /Giỏ hàng đang trống/)
})

/* ---------------------- shipProgressHtml ---------------------- */

test('shipProgressHtml an khi gio trong', () => {
  assert.equal(shipProgressHtml({ subtotal: 0, missing: 0, freeShipFrom: 150000 }), '')
})

test('shipProgressHtml hien so tien con thieu', () => {
  const html = shipProgressHtml({ subtotal: 120000, missing: 30000, freeShipFrom: 150000 })
  assert.match(html, /width:80%/)
  assert.match(html, /30\.000đ/)
})

test('shipProgressHtml bao mien phi khi du nguong', () => {
  const html = shipProgressHtml({ subtotal: 160000, missing: 0, freeShipFrom: 150000 })
  assert.match(html, /width:100%/)
  assert.match(html, /miễn phí giao/)
})

/* ---------------------- cartSummaryHtml ----------------------- */

test('cartSummaryHtml hien tam tinh, phi ship va tong', () => {
  const html = cartSummaryHtml(summarize([line({ qty: 1 })], {
    freeShipFrom: 150000,
    shipFee: 15000,
  }))
  assert.match(html, /Tạm tính \(1 món\)/)
  assert.match(html, /65\.000đ/)
  assert.match(html, /15\.000đ/)
  assert.match(html, /80\.000đ/)
})

test('cartSummaryHtml ghi mien phi khi duoc mien ship', () => {
  const html = cartSummaryHtml(summarize([line({ qty: 3 })], {
    freeShipFrom: 150000,
    shipFee: 15000,
  }))
  assert.match(html, /Miễn phí/)
})
