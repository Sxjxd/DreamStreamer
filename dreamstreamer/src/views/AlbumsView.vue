<template>
  <div class="p-6 bg-black min-h-screen">
    <h1 class="text-4xl font-bold text-purple-400 mb-6">Browse Albums</h1>
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
</template>

<script setup>
import {ref} from 'vue';

const albums = ref([
  {
    id: 1,
    title: 'Album One',
    artist: 'Artist One',
    image: 'https://example.com/album1.jpg',
  },
  {
    id: 2,
    title: 'Album Two',
    artist: 'Artist Two',
    image: 'https://example.com/album2.jpg',
  },
  // Add more album data here
]);
</script>
