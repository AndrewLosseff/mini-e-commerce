<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import type { Product } from '../types/product'
import { useCartStore } from '../stores/cart'

const { product } = defineProps<{ product: Product }>()

const cartStore = useCartStore()
const toast = useToast()

const isInCart = computed(() => cartStore.items.some(i => i.product.id === product.id))

function toggleCart() {
  if (isInCart.value) {
    cartStore.removeItem(product.id)
    toast.add({
      severity: 'info',
      summary: 'Removed from cart',
      detail: `"${product.name}" removed from your cart.`,
      life: 3000,
    })
  } else {
    cartStore.addItem(product)
    toast.add({
      severity: 'success',
      summary: 'Added to cart',
      detail: `"${product.name}" added to your cart.`,
      life: 3000,
    })
  }
}
</script>

<template>
  <article
    class="group bg-white rounded-xl border border-gray-200 overflow-hidden h-full flex flex-col
           hover:shadow-lg hover:border-gray-300 transition-all duration-200"
  >
    <RouterLink
      :to="{ name: 'product-detail', params: { id: product.id } }"
      class="flex flex-col flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
             focus-visible:ring-inset"
      :aria-label="`View details for ${product.name}`"
    >
      <div class="overflow-hidden">
        <img
          :src="product.thumbnailUrl"
          :alt="product.name"
          width="300"
          height="200"
          class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div class="p-4 flex flex-col flex-1">
        <span class="text-xs font-semibold text-blue-600 uppercase tracking-wide">
          {{ product.category }}
        </span>
        <h3 class="font-semibold text-gray-900 mt-1 line-clamp-2 leading-snug">
          {{ product.name }}
        </h3>
        <p class="text-gray-500 text-sm mt-1 flex-1 line-clamp-2">
          {{ product.shortDescription }}
        </p>
        <p class="text-lg font-bold text-gray-900 mt-3">${{ product.price.toFixed(2) }}</p>
      </div>
    </RouterLink>

    <div class="px-4 pb-4">
      <Button
        :label="isInCart ? 'Remove from cart' : 'Add to cart'"
        :icon="isInCart ? 'pi pi-times' : 'pi pi-shopping-cart'"
        :severity="isInCart ? 'secondary' : 'primary'"
        size="small"
        class="w-full"
        :aria-label="isInCart ? `Remove ${product.name} from cart` : `Add ${product.name} to cart`"
        @click="toggleCart"
      />
    </div>
  </article>
</template>
