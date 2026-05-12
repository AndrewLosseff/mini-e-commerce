import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../cart'
import type { Product } from '../../types/product'

const p1: Product = {
  id: 'p1',
  name: 'Alpha',
  price: 10,
  shortDescription: '',
  thumbnailUrl: '',
  longDescription: '',
  category: 'Software',
  reviews: [],
}

const p2: Product = {
  id: 'p2',
  name: 'Beta',
  price: 20,
  shortDescription: '',
  thumbnailUrl: '',
  longDescription: '',
  category: 'Course',
  reviews: [],
}

describe('cart store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('starts empty', () => {
    const store = useCartStore()
    expect(store.items).toHaveLength(0)
    expect(store.itemCount).toBe(0)
    expect(store.subtotal).toBe(0)
  })

  it('adds a new item with quantity 1', () => {
    const store = useCartStore()
    store.addItem(p1)
    expect(store.items).toHaveLength(1)
    expect(store.items[0].quantity).toBe(1)
    expect(store.itemCount).toBe(1)
  })

  it('increments quantity when adding the same product again', () => {
    const store = useCartStore()
    store.addItem(p1)
    store.addItem(p1)
    expect(store.items).toHaveLength(1)
    expect(store.items[0].quantity).toBe(2)
    expect(store.itemCount).toBe(2)
  })

  it('calculates subtotal correctly with multiple items', () => {
    const store = useCartStore()
    store.addItem(p1) // 10
    store.addItem(p1) // 10 × 2 = 20
    store.addItem(p2) // 20
    expect(store.subtotal).toBe(40)
  })

  it('updates quantity', () => {
    const store = useCartStore()
    store.addItem(p1)
    store.updateQuantity('p1', 5)
    expect(store.items[0].quantity).toBe(5)
    expect(store.itemCount).toBe(5)
    expect(store.subtotal).toBe(50)
  })

  it('removes item when quantity updated to 0', () => {
    const store = useCartStore()
    store.addItem(p1)
    store.updateQuantity('p1', 0)
    expect(store.items).toHaveLength(0)
  })

  it('removes a specific item', () => {
    const store = useCartStore()
    store.addItem(p1)
    store.addItem(p2)
    store.removeItem('p1')
    expect(store.items).toHaveLength(1)
    expect(store.items[0].product.id).toBe('p2')
  })

  it('clears the cart', () => {
    const store = useCartStore()
    store.addItem(p1)
    store.addItem(p2)
    store.clear()
    expect(store.items).toHaveLength(0)
    expect(store.itemCount).toBe(0)
    expect(store.subtotal).toBe(0)
  })

  it('persists to localStorage on addItem', () => {
    const store = useCartStore()
    store.addItem(p1)
    const saved = JSON.parse(localStorage.getItem('ecommerce-cart') ?? '[]') as unknown[]
    expect(saved).toHaveLength(1)
  })
})
