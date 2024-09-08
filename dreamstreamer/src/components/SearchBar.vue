<template>
  <div class="flex justify-center mb-8">
    <input
        type="text"
        placeholder="Search for music..."
        v-model="searchQuery"
        @input="onSearch"
        class="w-full sm:w-96 bg-gray-800 text-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:bg-gray-700"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');

const onSearch = () => {
  // Logic for search functionality (filtering newReleases, topCharts, etc.)
  console.log('Searching for:', searchQuery.value);
};
</script>