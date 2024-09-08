<template>
  <section class="mt-6">
    <h2 class="text-2xl font-semibold text-purple-400 mb-4">Featured Playlists</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
          v-for="playlist in featuredPlaylists"
          :key="playlist.id"
          class="bg-gray-800 hover:bg-gray-700 rounded-lg p-4"
      >
        <img :src="playlist.image" alt="Playlist cover" class="rounded-md mb-4 w-full h-48 object-cover" />
        <h3 class="text-lg font-semibold text-gray-100">{{ playlist.title }}</h3>
        <p class="text-sm text-gray-400">{{ playlist.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const featuredPlaylists = ref([
  {
    id: 1,
    title: 'Chill Vibes',
    description: 'Relax and unwind with these laid-back tunes.',
    image: 'https://example.com/playlist1.jpg',
  },
  {
    id: 2,
    title: 'Top Hits',
    description: 'The hottest tracks of the moment.',
    image: 'https://example.com/playlist2.jpg',
  },
  // Add more playlist data here
]);
</script>
