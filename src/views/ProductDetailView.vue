<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '../stores/products'
import { useCartStore } from '../stores/cart'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import Skeleton from 'primevue/skeleton'
import Tag from 'primevue/tag'
import ReviewList from '../components/ReviewList.vue'
import ErrorState from '../components/ErrorState.vue'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const toast = useToast()
const { loading, error } = storeToRefs(productsStore)

const productId = computed(() => route.params.id as string)
const product = computed(() => productsStore.getById(productId.value))
const notFound = computed(() => !loading.value && !error.value && !product.value)

onMounted(() => productsStore.load())

function addToCart() {
  if (!product.value) return
  cartStore.addItem(product.value)
  toast.add({
    severity: 'success',
    summary: 'Added to cart',
    detail: `"${product.value.name}" added to your cart.`,
    life: 3000,
  })
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <RouterLink
      :to="{ name: 'products' }"
      class="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8
             transition-colors group focus:outline-none focus-visible:ring-2
             focus-visible:ring-blue-500 rounded"
    >
      <i
        class="pi pi-arrow-left group-hover:-translate-x-1 transition-transform"
        aria-hidden="true"
      ></i>
      Back to Products
    </RouterLink>

    <ErrorState v-if="error" :message="error" @retry="productsStore.load()" />

    <div v-else-if="notFound" class="text-center py-16" role="main">
      <i class="pi pi-box text-5xl text-gray-300 mb-4 block" aria-hidden="true"></i>
      <h1 class="text-2xl font-semibold text-gray-900 mb-2">Product not found</h1>
      <p class="text-gray-500 mb-6">This product doesn't exist or may have been removed.</p>
      <RouterLink
        :to="{ name: 'products' }"
        class="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg font-medium
               hover:bg-blue-700 transition-colors"
      >
        Browse Products
      </RouterLink>
    </div>

    <div v-else-if="loading" aria-busy="true" aria-label="Loading product">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Skeleton height="22rem" border-radius="0.75rem" />
        <div class="space-y-4">
          <Skeleton width="30%" height="1rem" />
          <Skeleton width="75%" height="2rem" />
          <Skeleton width="25%" height="1.75rem" />
          <Skeleton width="100%" height="1rem" />
          <Skeleton width="100%" height="1rem" />
          <Skeleton width="65%" height="1rem" />
          <Skeleton width="9rem" height="2.75rem" class="mt-4" />
        </div>
      </div>
    </div>

    <div v-else-if="product">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <img
            :src="product.thumbnailUrl"
            :alt="product.name"
            class="w-full rounded-xl object-cover aspect-video shadow-sm"
          />
        </div>

        <div class="flex flex-col">
          <Tag :value="product.category" class="self-start mb-3" />
          <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
          <p class="text-3xl font-bold text-blue-600 mb-4">${{ product.price.toFixed(2) }}</p>
          <p class="text-gray-700 font-medium mb-3">{{ product.shortDescription }}</p>
          <p class="text-gray-600 leading-relaxed flex-1">{{ product.longDescription }}</p>

          <Button
            label="Add to Cart"
            icon="pi pi-shopping-cart"
            size="large"
            class="mt-6 w-full sm:w-auto"
            @click="addToCart"
          />
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 p-6">
        <ReviewList :reviews="product.reviews" />
      </div>
    </div>
  </div>
</template>
