import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useProductFilters } from '../useProductFilters'
import type { Product } from '../../types/product'

function makeProduct(id: string, name: string, price: number, category: string): Product {
  return { id, name, price, category, shortDescription: '', thumbnailUrl: '', longDescription: '', reviews: [] }
}

const products = [
  makeProduct('p1', 'Alpha Course', 50, 'Online Course'),
  makeProduct('p2', 'Beta Software', 100, 'Software'),
  makeProduct('p3', 'Gamma E-Book', 25, 'E-Book'),
]

describe('useProductFilters', () => {
  it('returns all products with no filters active', () => {
    const { filteredProducts } = useProductFilters(ref(products))
    expect(filteredProducts.value).toHaveLength(3)
  })

  it('filters by name (case-insensitive)', () => {
    const { searchQuery, filteredProducts } = useProductFilters(ref(products))
    searchQuery.value = 'alpha'
    expect(filteredProducts.value).toHaveLength(1)
    expect(filteredProducts.value[0].id).toBe('p1')
  })

  it('returns empty list when name matches nothing', () => {
    const { searchQuery, filteredProducts } = useProductFilters(ref(products))
    searchQuery.value = 'zzz'
    expect(filteredProducts.value).toHaveLength(0)
  })

  it('filters by a single category', () => {
    const { selectedCategories, filteredProducts } = useProductFilters(ref(products))
    selectedCategories.value = ['Software']
    expect(filteredProducts.value).toHaveLength(1)
    expect(filteredProducts.value[0].id).toBe('p2')
  })

  it('filters by multiple categories', () => {
    const { selectedCategories, filteredProducts } = useProductFilters(ref(products))
    selectedCategories.value = ['Software', 'E-Book']
    expect(filteredProducts.value).toHaveLength(2)
  })

  it('combines name search and category filter', () => {
    const { searchQuery, selectedCategories, filteredProducts } = useProductFilters(ref(products))
    searchQuery.value = 'beta'
    selectedCategories.value = ['Software']
    expect(filteredProducts.value).toHaveLength(1)
    expect(filteredProducts.value[0].id).toBe('p2')
  })

  it('sorts by price ascending', () => {
    const { sortOption, filteredProducts } = useProductFilters(ref(products))
    sortOption.value = 'price-asc'
    expect(filteredProducts.value.map(p => p.price)).toEqual([25, 50, 100])
  })

  it('sorts by price descending', () => {
    const { sortOption, filteredProducts } = useProductFilters(ref(products))
    sortOption.value = 'price-desc'
    expect(filteredProducts.value.map(p => p.price)).toEqual([100, 50, 25])
  })

  it('sorts by name ascending (default)', () => {
    const { filteredProducts } = useProductFilters(ref(products))
    expect(filteredProducts.value.map(p => p.name)).toEqual([
      'Alpha Course',
      'Beta Software',
      'Gamma E-Book',
    ])
  })

  it('sorts by name descending', () => {
    const { sortOption, filteredProducts } = useProductFilters(ref(products))
    sortOption.value = 'name-desc'
    expect(filteredProducts.value.map(p => p.name)).toEqual([
      'Gamma E-Book',
      'Beta Software',
      'Alpha Course',
    ])
  })

  it('derives unique sorted categories from product list', () => {
    const { categories } = useProductFilters(ref(products))
    expect(categories.value).toEqual(['E-Book', 'Online Course', 'Software'])
  })
})
