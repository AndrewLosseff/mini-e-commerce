<script setup lang="ts">
import { computed } from 'vue'
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import Checkbox from 'primevue/checkbox'

const props = defineProps<{ categories: string[] }>()

const searchQuery = defineModel<string>('searchQuery', { required: true })
const selectedCategories = defineModel<string[]>('selectedCategories', { required: true })

const categoryOptions = computed(() =>
  props.categories.map(c => ({ label: c, value: c })),
)

const hasActiveFilters = computed(
  () => searchQuery.value.trim() !== '' || selectedCategories.value.length > 0,
)

function clearAll() {
  searchQuery.value = ''
  selectedCategories.value = []
}
</script>

<template>
  <div class="space-y-4">
    <div>
      <label for="filter-search" class="block text-sm font-medium text-gray-700 mb-1">
        Search
      </label>
      <InputText
        id="filter-search"
        v-model="searchQuery"
        placeholder="Search products…"
        class="w-full"
      />
    </div>

    <div>
      <label for="filter-category" class="block text-sm font-medium text-gray-700 mb-1">
        Category
      </label>
      <MultiSelect
        v-model="selectedCategories"
        input-id="filter-category"
        :options="categoryOptions"
        option-label="label"
        option-value="value"
        placeholder="All categories"
        class="w-full"
        display="chip"
        :show-toggle-all="false"
      >
        <template #header>
          <div
            class="flex items-center gap-2 m-1 px-3 py-2 cursor-pointer transition-colors
                   hover:bg-[var(--p-content-hover-background)]"
            :class="selectedCategories.length === 0
              ? 'bg-[var(--p-highlight-background)] text-[var(--p-highlight-color)]'
              : ''"
            role="option"
            :aria-selected="selectedCategories.length === 0"
            @click="selectedCategories = []"
          >
            <Checkbox
              :model-value="selectedCategories.length === 0"
              :binary="true"
              :tabindex="-1"
              @update:model-value="selectedCategories = []"
              @click.stop
            />
            <span>All categories</span>
          </div>
        </template>
      </MultiSelect>
    </div>

    <button
      v-if="hasActiveFilters"
      class="w-full text-sm text-blue-600 hover:text-blue-800 font-medium py-1.5
             border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors
             focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      @click="clearAll"
    >
      Clear all filters
    </button>
  </div>
</template>
