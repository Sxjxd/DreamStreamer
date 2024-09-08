<template>
  <section id="featured-content" class="mt-12 w-full px-6">
    <h2 class="text-3xl font-bold text-purple-400 mb-8 text-center">Explore Music</h2>

    <!-- Types of Songs -->
    <div class="mb-12">
      <h3 class="text-2xl font-semibold text-gray-300 mb-4">Trending Songs</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
            v-for="song in popularSongs"
            :key="song.id"
            class="bg-gray-800 hover:bg-gray-700 rounded-lg p-4"
        >
          <img :src="song.image" alt="Song cover" class="rounded-md mb-4 w-full h-48 object-cover" />
          <h3 class="text-lg font-semibold text-gray-100">{{ song.title }}</h3>
          <p class="text-sm text-gray-400">{{ song.artist }}</p>
        </div>
      </div>
    </div>

    <!-- Albums -->
    <div class="mb-12">
      <h3 class="text-2xl font-semibold text-gray-300 mb-4">Albums</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
            v-for="album in albums"
            :key="album.id"
            class="bg-gray-800 hover:bg-gray-700 rounded-lg p-4"
        >
          <img :src="album.image" alt="Album cover" class="rounded-md mb-4 w-full h-48 object-cover" />
          <h3 class="text-lg font-semibold text-gray-100">{{ album.title }}</h3>
          <p class="text-sm text-gray-400">{{ album.artist }}</p>
        </div>
      </div>
    </div>

    <!-- Popular Artists -->
    <div class="mb-10">
      <h3 class="text-2xl font-semibold text-gray-300 mb-4">Popular Artists</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div
            v-for="artist in popularArtists"
            :key="artist.id"
            class="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 text-center"
        >
          <img :src="artist.image" alt="Artist photo" class="rounded-full mb-4 w-24 h-24 object-cover mx-auto" />
          <h3 class="text-lg font-semibold text-gray-100">{{ artist.name }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const popularSongs = ref([
  { id: 1, title: 'Song One', artist: 'Artist One', image: 'https://example.com/song1.jpg' },
  { id: 2, title: 'Song Two', artist: 'Artist Two', image: 'https://example.com/song2.jpg' },
  // Add more songs
]);

const albums = ref([
  { id: 1, title: 'Album One', artist: 'Artist One', image: 'https://example.com/album1.jpg' },
  { id: 2, title: 'Album Two', artist: 'Artist Two', image: 'https://example.com/album2.jpg' },
  // Add more albums
]);

const popularArtists = ref([
  { id: 1, name: 'Artist One', image: 'https://example.com/artist1.jpg' },
  { id: 2, name: 'Artist Two', image: 'https://example.com/artist2.jpg' },
  // Add more artists
]);
</script>

<style scoped>
/* Additional styling if needed */
</style>
