<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <h1 class="text-3xl font-bold text-purple-400 mb-8">Your Library</h1>

    <!-- Saved Playlists Section -->
    <section v-if="playlists.length" class="mb-12">
      <h2 class="text-2xl font-semibold text-purple-400 mb-4">Playlists</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        <div
            v-for="playlist in playlists"
            :key="playlist.id"
            class="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition transform hover:scale-105"
        >
          <img :src="playlist.image" alt="Playlist cover" class="rounded-md mb-4 w-full h-48 object-cover" />
          <h3 class="text-lg font-semibold text-gray-100 truncate">{{ playlist.name }}</h3>
          <p class="text-sm text-gray-400 truncate">{{ playlist.songCount }} songs</p>
        </div>
      </div>
    </section>

    <!-- Liked Songs Section -->
    <section v-if="likedSongs.length" class="mb-12">
      <h2 class="text-2xl font-semibold text-purple-400 mb-4">Liked Songs</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        <div
            v-for="song in likedSongs"
            :key="song.id"
            class="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition transform hover:scale-105"
        >
          <img :src="song.image" alt="Song cover" class="rounded-md mb-4 w-full h-48 object-cover" />
          <h3 class="text-lg font-semibold text-gray-100 truncate">{{ song.title }}</h3>
          <p class="text-sm text-gray-400 truncate">{{ song.artist }}</p>
        </div>
      </div>
    </section>

    <!-- Saved Albums Section -->
    <section v-if="albums.length" class="mb-12">
      <h2 class="text-2xl font-semibold text-purple-400 mb-4">Albums</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
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
    </section>

    <!-- Empty State -->
    <section v-if="!playlists.length && !likedSongs.length && !albums.length">
      <div class="text-center mt-20">
        <h2 class="text-2xl font-semibold text-gray-400">Your library is empty</h2>
        <p class="text-sm text-gray-500 mt-2">Start exploring and save your favorite music and playlists!</p>
        <router-link
            to="/browse"
            class="mt-6 inline-block bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-full font-semibold transition"
        >
          Explore Music
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Placeholder data for saved playlists
const playlists = ref([
  { id: 1, name: 'Chill Vibes', songCount: 25, image: 'https://via.placeholder.com/300' },
  { id: 2, name: 'Workout Hits', songCount: 40, image: 'https://via.placeholder.com/300' },
  // Add more playlists
]);

// Placeholder data for liked songs
const likedSongs = ref([
  { id: 1, title: 'Song One', artist: 'Artist One', image: 'https://via.placeholder.com/300' },
  { id: 2, title: 'Song Two', artist: 'Artist Two', image: 'https://via.placeholder.com/300' },
  // Add more liked songs
]);

// Placeholder data for saved albums
const albums = ref([
  { id: 1, title: 'Album One', artist: 'Artist One', image: 'https://via.placeholder.com/300' },
  { id: 2, title: 'Album Two', artist: 'Artist Two', image: 'https://via.placeholder.com/300' },
  // Add more albums
]);
</script>

<style scoped>
/* Custom hover and scaling effects */
div:hover {
  transition: transform 0.3s ease, background-color 0.3s ease;
}
</style>
