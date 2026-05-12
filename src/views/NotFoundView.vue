<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
</script>

<template>
  <main
    class="min-h-[60vh] flex items-center justify-center px-4"
    aria-label="Page not found"
  >
    <div class="text-center">
      <p class="text-8xl font-black text-gray-100 leading-none select-none" aria-hidden="true">
        404
      </p>
      <h1 class="text-2xl font-semibold text-gray-900 mt-4 mb-2">Page not found</h1>
      <p class="text-gray-500 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <RouterLink :to="{ name: 'products' }">
        <Button label="Go to Products" icon="pi pi-home" />
      </RouterLink>
    </div>
  </main>
</template>
