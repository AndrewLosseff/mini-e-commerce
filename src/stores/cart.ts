import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { z } from 'zod'
import { cartItemSchema } from '../types/product'
import type { Product, CartItem } from '../types/product'

const STORAGE_KEY = 'ecommerce-cart'

const cartItemsSchema = z.array(cartItemSchema)

function loadFromStorage(): CartItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return []
    const result = cartItemsSchema.safeParse(JSON.parse(saved))
    return result.success ? result.data : []
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(loadFromStorage())

  const itemCount = computed(() => items.value.reduce((sum, i) => sum + i.quantity, 0))
  const subtotal = computed(() =>
    items.value.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  )

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
    } catch {
      // Storage quota exceeded (e.g. Safari private browsing) — state lives in memory only
    }
  }

  function addItem(product: Product) {
    const existing = items.value.find(i => i.product.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ product, quantity: 1 })
    }
    save()
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    const item = items.value.find(i => i.product.id === productId)
    if (item) {
      item.quantity = quantity
      save()
    }
  }

  function removeItem(productId: string) {
    const idx = items.value.findIndex(i => i.product.id === productId)
    if (idx > -1) {
      items.value.splice(idx, 1)
      save()
    }
  }

  function clear() {
    items.value = []
    save()
  }

  return { items, itemCount, subtotal, addItem, updateQuantity, removeItem, clear }
})
