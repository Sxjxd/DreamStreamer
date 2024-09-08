<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <!-- Search Bar -->
    <SearchBar />

    <!-- New Releases Section -->
    <section class="mt-8">
      <h2 class="text-2xl font-semibold text-purple-400 mb-4">New Releases</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        <div
            v-for="release in newReleases"
            :key="release.id"
            class="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition transform hover:scale-105"
        >
          <img :src="release.image" alt="Album cover" class="rounded-md mb-4 w-full h-48 object-cover" />
          <h3 class="text-lg font-semibold text-gray-100 truncate">{{ release.title }}</h3>
          <p class="text-sm text-gray-400 truncate">{{ release.artist }}</p>
        </div>
      </div>
    </section>

    <!-- Top Charts Section -->
    <section class="mt-12">
      <h2 class="text-2xl font-semibold text-purple-400 mb-4">Top Charts</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        <div
            v-for="chart in topCharts"
            :key="chart.id"
            class="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition transform hover:scale-105"
        >
          <img :src="chart.image" alt="Song cover" class="rounded-md mb-4 w-full h-48 object-cover" />
          <h3 class="text-lg font-semibold text-gray-100 truncate">{{ chart.title }}</h3>
          <p class="text-sm text-gray-400 truncate">{{ chart.artist }}</p>
        </div>
      </div>
    </section>

    <!-- Popular Genres Section -->
    <section class="mt-12">
      <h2 class="text-2xl font-semibold text-purple-400 mb-4">Popular Genres</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        <div
            v-for="genre in genres"
            :key="genre.id"
            class="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 text-center transition transform hover:scale-105"
        >
          <h3 class="text-lg font-semibold text-gray-100">{{ genre.name }}</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchBar from '@/components/SearchBar.vue';

// Mock data for new releases
const newReleases = ref([
  { id: 1, title: 'New Album One', artist: 'Artist One', image: 'https://via.placeholder.com/300' },
  { id: 2, title: 'New Album Two', artist: 'Artist Two', image: 'https://via.placeholder.com/300' },
  // Add more albums
]);

// Mock data for top charts
const topCharts = ref([
  { id: 1, title: 'Hit Song One', artist: 'Artist One', image: 'https://via.placeholder.com/300' },
  { id: 2, title: 'Hit Song Two', artist: 'Artist Two', image: 'https://via.placeholder.com/300' },
  // Add more chart songs
]);

// Mock data for popular genres
const genres = ref([
  { id: 1, name: 'Pop' },
  { id: 2, name: 'Rock' },
  { id: 3, name: 'Hip-Hop' },
  { id: 4, name: 'Jazz' },
  // Add more genres
]);
</script>

<style scoped>
/* Ensure that hover and scale effects are smooth */
div:hover {
  transition: transform 0.3s ease, background-color 0.3s ease;
}
</style>
