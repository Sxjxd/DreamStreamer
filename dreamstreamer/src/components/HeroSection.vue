<template>
  <section class="bg-cover bg-center h-96 text-white flex items-center justify-center" :style="{ backgroundImage: 'url(https://example.com/hero-image.jpg)' }">
    <div class="text-center">
      <h1 class="text-5xl font-bold mb-4 text-purple-200">Discover Your Next Favorite Track</h1>
      <p class="text-lg mb-8 text-purple-300">Stream the latest hits and timeless classics with DreamStreamer.</p>
      <button @click="scrollToContent" class="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full text-white font-semibold">
        Get Started
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const scrollToContent = () => {
  const contentSection = document.getElementById('featured-content');
  if (contentSection) {
    contentSection.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
/* Additional styling if needed */
</style>
