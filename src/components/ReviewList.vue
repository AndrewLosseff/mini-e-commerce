<script setup lang="ts">
import type { Review } from '../types/product'

defineProps<{ reviews: Review[] }>()
</script>

<template>
  <section aria-label="Customer reviews">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">
      Customer Reviews
      <span class="text-gray-400 font-normal text-sm">({{ reviews.length }})</span>
    </h2>

    <p v-if="reviews.length === 0" class="text-gray-500 text-sm">
      No reviews yet. Be the first!
    </p>

    <ul v-else class="space-y-3">
      <li
        v-for="(review, index) in reviews"
        :key="`${review.username}-${index}`"
        class="bg-gray-50 rounded-lg p-4"
      >
        <div class="flex items-center gap-2 mb-1">
          <i class="pi pi-user text-gray-400" aria-hidden="true"></i>
          <span class="font-medium text-gray-900 text-sm">{{ review.username }}</span>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">{{ review.comment }}</p>
      </li>
    </ul>
  </section>
</template>
