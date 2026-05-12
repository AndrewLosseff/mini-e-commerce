import { computed, ref, type Ref } from 'vue'
import type { Product } from '../types/product'

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc'

export function useProductFilters(products: Ref<Product[]>) {
  const searchQuery = ref('')
  const selectedCategories = ref<string[]>([])
  const sortOption = ref<SortOption>('name-asc')

  const categories = computed(() => [...new Set(products.value.map(p => p.category))].sort())

  const filteredProducts = computed(() => {
    let result = products.value

    const q = searchQuery.value.trim().toLowerCase()
    if (q) {
      result = result.filter(p => p.name.toLowerCase().includes(q))
    }

    if (selectedCategories.value.length > 0) {
      result = result.filter(p => selectedCategories.value.includes(p.category))
    }

    return [...result].sort((a, b) => {
      switch (sortOption.value) {
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
      }
    })
  })

  return { searchQuery, selectedCategories, sortOption, categories, filteredProducts }
}
