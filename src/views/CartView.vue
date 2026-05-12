<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import CartLineItem from '../components/CartLineItem.vue'

const cartStore = useCartStore()
const confirm = useConfirm()
const toast = useToast()

function checkout() {
  confirm.require({
    message: 'Place your order for ' + cartStore.itemCount + ' item(s)?',
    header: 'Confirm Order',
    icon: 'pi pi-check-circle',
    acceptLabel: 'Place Order',
    rejectLabel: 'Cancel',
    accept() {
      cartStore.clear()
      toast.add({
        severity: 'success',
        summary: 'Order placed!',
        detail: 'Thank you for your purchase. Your order is confirmed.',
        life: 5000,
      })
    },
  })
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

    <div v-if="cartStore.itemCount === 0" class="text-center py-16" role="status">
      <i class="pi pi-shopping-cart text-5xl text-gray-300 mb-4 block" aria-hidden="true"></i>
      <h2 class="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
      <p class="text-gray-500 mb-6">Add products to get started.</p>
      <RouterLink
        :to="{ name: 'products' }"
        class="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg font-medium
               hover:bg-blue-700 transition-colors"
      >
        Browse Products
      </RouterLink>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <section
        class="lg:col-span-2 bg-white rounded-xl border border-gray-200 px-6"
        aria-label="Cart items"
      >
        <CartLineItem
          v-for="item in cartStore.items"
          :key="item.product.id"
          :item="item"
        />
      </section>

      <aside class="bg-white rounded-xl border border-gray-200 p-6 h-fit sticky top-24">
        <h2 class="font-semibold text-gray-900 text-lg mb-4">Order Summary</h2>

        <dl class="space-y-2 text-sm text-gray-600 mb-4">
          <div class="flex justify-between">
            <dt>Items ({{ cartStore.itemCount }})</dt>
            <dd>${{ cartStore.subtotal.toFixed(2) }}</dd>
          </div>
          <div class="flex justify-between">
            <dt>Tax</dt>
            <dd>$0.00</dd>
          </div>
        </dl>

        <div
          class="flex justify-between font-bold text-gray-900 text-lg
                 border-t border-gray-200 pt-4 mb-6"
        >
          <span>Total</span>
          <span>${{ cartStore.subtotal.toFixed(2) }}</span>
        </div>

        <Button
          label="Checkout"
          icon="pi pi-credit-card"
          class="w-full"
          @click="checkout"
        />
      </aside>
    </div>
  </div>
</template>
