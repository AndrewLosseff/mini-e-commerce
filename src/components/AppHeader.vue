<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import Badge from 'primevue/badge'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const route = useRoute()
</script>

<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <RouterLink
          :to="{ name: 'products' }"
          class="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
        >
          DigitalShop
        </RouterLink>

        <nav class="flex items-center gap-6" aria-label="Main navigation">
          <RouterLink
            :to="{ name: 'products' }"
            class="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            :class="{ 'text-blue-600': route.name === 'products' }"
            :aria-current="route.name === 'products' ? 'page' : undefined"
          >
            Products
          </RouterLink>

          <RouterLink
            :to="{ name: 'cart' }"
            class="relative flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-medium transition-colors"
            :class="{ 'text-blue-600': route.name === 'cart' }"
            :aria-current="route.name === 'cart' ? 'page' : undefined"
            :aria-label="`Cart, ${cartStore.itemCount} item${cartStore.itemCount !== 1 ? 's' : ''}`"
          >
            <i class="pi pi-shopping-cart text-lg" aria-hidden="true"></i>
            <span>Cart</span>
            <Badge
              v-if="cartStore.itemCount > 0"
              :value="cartStore.itemCount"
              class="ml-1"
            />
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>
