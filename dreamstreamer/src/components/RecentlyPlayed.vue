<template>
  <section v-if="recentlyPlayed.length" class="mt-6">
    <h2 class="text-2xl font-semibold text-purple-400 mb-4">Recently Played</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
          v-for="item in recentlyPlayed"
          :key="item.id"
          class="bg-gray-800 hover:bg-gray-700 rounded-lg p-4"
      >
        <img :src="item.image" alt="Recently played cover" class="rounded-md mb-4 w-full h-48 object-cover" />
        <h3 class="text-lg font-semibold text-gray-100">{{ item.title }}</h3>
        <p class="text-sm text-gray-400">{{ item.artist }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const recentlyPlayed = ref([]);

// Simulating fetching recently played data
onMounted(() => {
  const playedData = JSON.parse(localStorage.getItem('recentlyPlayed') || '[]');
  recentlyPlayed.value = playedData;
});
</script>

<style scoped>
/* Additional styling if needed */
</style>
