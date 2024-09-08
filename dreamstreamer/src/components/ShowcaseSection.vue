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

    <!-- Featured Playlists Section -->
    <div class="mb-12">
      <h2 class="text-2xl font-semibold text-purple-400 mb-4">Featured Playlists</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div
            v-for="playlist in featuredPlaylists"
            :key="playlist.id"
            class="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition transform hover:scale-105"
        >
          <img :src="playlist.image" alt="Playlist cover" class="rounded-md mb-4 w-full h-48 object-cover" />
          <h3 class="text-lg font-semibold text-gray-100 truncate">{{ playlist.title }}</h3>
          <p class="text-sm text-gray-400 truncate">{{ playlist.description }}</p>
        </div>
      </div>
    </div>

    <!-- Genres Section -->
    <div class="mb-12">
      <h2 class="text-2xl font-semibold text-purple-400 mb-4">Genres</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div
            v-for="genre in genres"
            :key="genre.id"
            class="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 text-center transition transform hover:scale-105"
        >
          <h3 class="text-lg font-semibold text-gray-100">{{ genre.name }}</h3>
        </div>
      </div>
    </div>

    <!-- Albums Section -->
    <div>
      <h2 class="text-2xl font-semibold text-purple-400 mb-4">Albums</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div
            v-for="album in albums"
            :key="album.id"
            class="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition transform hover:scale-105"
        >
          <img :src="album.image" alt="Album cover" class="rounded-md mb-4 w-full h-48 object-cover" />
          <h3 class="text-lg font-semibold text-gray-100 truncate">{{ album.title }}</h3>
          <p class="text-sm text-gray-400 truncate">{{ album.artist }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

// Placeholder data for trending songs
const trendingSongs = ref([
  { id: 1, title: 'Song One', artist: 'Artist One', image: 'https://via.placeholder.com/300' },
  { id: 2, title: 'Song Two', artist: 'Artist Two', image: 'https://via.placeholder.com/300' },
  // Add more song data
]);

// Placeholder data for featured playlists
const featuredPlaylists = ref([
  { id: 1, title: 'Chill Vibes', description: 'Relax with these tunes.', image: 'https://via.placeholder.com/300' },
  { id: 2, title: 'Top Hits', description: 'The hottest songs now.', image: 'https://via.placeholder.com/300' },
  // Add more playlist data
]);

// Placeholder data for genres
const genres = ref([
  { id: 1, name: 'Pop' },
  { id: 2, name: 'Rock' },
  { id: 3, name: 'Hip-Hop' },
  // Add more genres
]);

// Placeholder data for albums
const albums = ref([
  { id: 1, title: 'Album One', artist: 'Artist One', image: 'https://via.placeholder.com/300' },
  { id: 2, title: 'Album Two', artist: 'Artist Two', image: 'https://via.placeholder.com/300' },
  // Add more albums
]);
</script>

<style scoped>
/* Add custom transitions and hover effects */
div:hover {
  transition: transform 0.3s ease, background-color 0.3s ease;
}
</style>
