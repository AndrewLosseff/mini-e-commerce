<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
</script>

<template>
  <div
    class="bg-white rounded-xl border border-gray-200 overflow-hidden"
    aria-hidden="true"
    role="presentation"
  >
    <Skeleton height="12rem" border-radius="0" />
    <div class="p-4 space-y-2">
      <Skeleton width="35%" height="0.75rem" />
      <Skeleton width="80%" height="1rem" />
      <Skeleton width="60%" height="0.875rem" />
      <Skeleton width="40%" height="0.875rem" />
      <Skeleton width="25%" height="1.25rem" class="mt-1" />
    </div>
  </div>
</template>
