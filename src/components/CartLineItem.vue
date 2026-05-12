<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import type { CartItem } from '../types/product'
import { useCartStore } from '../stores/cart'

const { item } = defineProps<{ item: CartItem }>()
const cartStore = useCartStore()
</script>

<template>
  <div class="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
    <img
      :src="item.product.thumbnailUrl"
      :alt="item.product.name"
      class="w-16 h-16 object-cover rounded-lg flex-shrink-0"
    />

    <div class="flex-1 min-w-0">
      <h3 class="font-medium text-gray-900 truncate">{{ item.product.name }}</h3>
      <p class="text-gray-500 text-sm">${{ item.product.price.toFixed(2) }} each</p>
    </div>

    <div class="flex items-center gap-2">
      <InputNumber
        :model-value="item.quantity"
        :min="1"
        :max="99"
        show-buttons
        button-layout="horizontal"
        decrement-button-icon="pi pi-minus"
        increment-button-icon="pi pi-plus"
        :input-style="{ width: '2.5rem', textAlign: 'center', padding: '0.25rem' }"
        :aria-label="`Quantity for ${item.product.name}`"
        @update:model-value="cartStore.updateQuantity(item.product.id, $event ?? 1)"
      />
      <Button
        icon="pi pi-trash"
        severity="danger"
        text
        rounded
        size="small"
        :aria-label="`Remove ${item.product.name} from cart`"
        @click="cartStore.removeItem(item.product.id)"
      />
    </div>

    <div class="text-right w-20 flex-shrink-0">
      <p class="font-semibold text-gray-900">
        ${{ (item.product.price * item.quantity).toFixed(2) }}
      </p>
    </div>
  </div>
</template>
