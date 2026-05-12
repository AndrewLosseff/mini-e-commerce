<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import Paginator from 'primevue/paginator'
import Select from 'primevue/select'
import { useProductsStore } from '../stores/products'
import { useProductFilters } from '../composables/useProductFilters'
import type { SortOption } from '../composables/useProductFilters'
import ProductCard from '../components/ProductCard.vue'
import ProductFilters from '../components/ProductFilters.vue'
import ProductSkeleton from '../components/ProductSkeleton.vue'
import ErrorState from '../components/ErrorState.vue'

const PAGE_SIZE = 9

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'Name (A–Z)', value: 'name-asc' },
  { label: 'Name (Z–A)', value: 'name-desc' },
  { label: 'Price: low to high', value: 'price-asc' },
  { label: 'Price: high to low', value: 'price-desc' },
]

const productsStore = useProductsStore()
const { items, loading, error } = storeToRefs(productsStore)
const { searchQuery, selectedCategories, sortOption, categories, filteredProducts } =
  useProductFilters(items)

const first = ref(0)

watch([searchQuery, selectedCategories, sortOption], () => {
  first.value = 0
})

const paginatedProducts = computed(() =>
  filteredProducts.value.slice(first.value, first.value + PAGE_SIZE),
)

onMounted(() => productsStore.load())
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex gap-8">
      <aside class="hidden lg:block w-64 flex-shrink-0" aria-label="Product filters">
        <div class="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
          <h2 class="font-semibold text-gray-900 mb-4">Filters</h2>
          <ProductFilters
            v-model:search-query="searchQuery"
            v-model:selected-categories="selectedCategories"
            :categories="categories"
          />
        </div>
      </aside>

      <main class="flex-1 min-w-0">
        <div class="flex items-center justify-between mb-6 gap-4">
          <div class="flex items-center gap-2">
            <Select
              v-model="sortOption"
              input-id="sort-select"
              :options="sortOptions"
              option-label="label"
              option-value="value"
              class="w-48"
              :pt="{ label: { style: 'padding-top: 4px; padding-bottom: 4px' } }"
            />
          </div>
          <p v-if="!loading && !error" class="text-sm text-gray-500 whitespace-nowrap">
            {{ filteredProducts.length }}
            {{ filteredProducts.length === 1 ? 'product' : 'products' }}
          </p>
        </div>

        <details class="lg:hidden mb-6 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <summary
            class="px-5 py-3 font-medium text-gray-900 cursor-pointer select-none
                   hover:bg-gray-50 transition-colors"
          >
            Filters
          </summary>
          <div class="px-5 pb-5 pt-2">
            <ProductFilters
              v-model:search-query="searchQuery"
              v-model:selected-categories="selectedCategories"
              :categories="categories"
            />
          </div>
        </details>

        <ErrorState v-if="error" :message="error" @retry="productsStore.load()" />

        <div
          v-else-if="loading"
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          aria-label="Loading products"
          aria-busy="true"
        >
          <ProductSkeleton v-for="n in PAGE_SIZE" :key="n" />
        </div>

        <div
          v-else-if="filteredProducts.length === 0"
          class="flex flex-col items-center justify-center py-16 text-center text-gray-500"
          role="status"
        >
          <i class="pi pi-search text-4xl mb-3" aria-hidden="true"></i>
          <p class="font-medium">No products match your filters.</p>
          <button
            class="mt-3 text-blue-600 text-sm hover:underline focus:outline-none
                   focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            @click="searchQuery = ''; selectedCategories = []"
          >
            Clear filters
          </button>
        </div>

        <template v-else>
          <ul
            class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 list-none p-0"
            aria-label="Product list"
          >
            <li v-for="product in paginatedProducts" :key="product.id">
              <ProductCard :product="product" />
            </li>
          </ul>

          <Paginator
            v-if="filteredProducts.length > PAGE_SIZE"
            :first="first"
            :rows="PAGE_SIZE"
            :total-records="filteredProducts.length"
            class="mt-8"
            @page="first = $event.first"
          />
        </template>
      </main>
    </div>
  </div>
</template>
