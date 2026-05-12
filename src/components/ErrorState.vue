<script setup lang="ts">
withDefaults(defineProps<{ title?: string; message?: string }>(), {
  title: 'Something went wrong',
  message: 'An unexpected error occurred. Please try again.',
})

const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center py-16 text-center"
    role="alert"
    aria-live="assertive"
  >
    <i class="pi pi-exclamation-circle text-5xl text-red-400 mb-4" aria-hidden="true"></i>
    <h2 class="text-lg font-semibold text-gray-900 mb-2">{{ title }}</h2>
    <p class="text-gray-500 mb-6 max-w-sm">{{ message }}</p>
    <button
      class="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium
             hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
             transition-colors"
      @click="emit('retry')"
    >
      Try again
    </button>
  </div>
</template>
