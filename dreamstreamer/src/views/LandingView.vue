<template>
  <div class="relative h-auto flex flex-col justify-center items-center bg-gray-900 text-white">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Showcase Section -->
    <ShowcaseSection />
  </div>
</template>

<script setup>
import HeroSection from '@/components/HeroSection.vue';
import ShowcaseSection from '@/components/ShowcaseSection.vue';
</script>

<style scoped>
/* Additional styling if needed */
</style>
