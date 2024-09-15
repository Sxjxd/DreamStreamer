<template>
  <section class="mt-6 w-full px-4 md:px-6">
    <!-- Trending Songs Section -->
    <div class="mb-12">
      <h2 class="text-2xl font-semibold text-purple-400 mb-4">Trending Songs</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div
            v-for="song in trendingSongs"
            :key="song.id"
            class="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition transform hover:scale-105"
        >
          <img :src="song.image" alt="Song cover" class="rounded-md mb-4 w-full h-48 object-cover" />
          <h3 class="text-lg font-semibold text-gray-100 truncate">{{ song.title }}</h3>
          <p class="text-sm text-gray-400 truncate">{{ song.artist }}</p>
        </div>
      </div>
    </div>

    <!-- Other sections omitted for brevity -->
  </section>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import api from '@/services/api.js';

const trendingSongs = ref([]);
const albums = ref([]);
const genres = ref([]);

const fetchTrendingSongs = async () => {
  try {
    const response = await api.get('/songs/trending'); // Assuming your backend exposes this endpoint
    trendingSongs.value = response.data;
  } catch (error) {
    console.error('Failed to fetch trending songs:', error);
  }
};

const fetchAlbums = async () => {
  try {
    const response = await api.get('/albums');
    albums.value = response.data;
  } catch (error) {
    console.error('Failed to fetch albums:', error);
  }
};

const fetchGenres = async () => {
  try {
    const response = await api.get('/genres');
    genres.value = response.data;
  } catch (error) {
    console.error('Failed to fetch genres:', error);
  }
};

onMounted(() => {
  fetchTrendingSongs();
  fetchAlbums();
  fetchGenres();
});
</script>

<style scoped>
/* Your existing styles */
</style>
