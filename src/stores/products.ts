import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '../types/product'
import { fetchProducts } from '../services/productService'

export const useProductsStore = defineStore('products', () => {
  const items = ref<Product[]>([])
  const loading = ref(false)
  const loaded = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    if (items.value.length > 0 || loading.value) return
    loading.value = true
    error.value = null
    try {
      items.value = await fetchProducts()
      loaded.value = true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load products'
    } finally {
      loading.value = false
    }
  }

  function getById(id: string): Product | undefined {
    return items.value.find(p => p.id === id)
  }

  return { items, loading, loaded, error, load, getById }
})
