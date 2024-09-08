<template>
  <div class="p-6">
    <!-- Welcome Message -->
    <WelcomeMessage />

    <!-- Showcase Section -->
    <ShowcaseSection />

    <!-- Media Player (appears at the bottom) -->
    <MediaPlayer />
  </div>
</template>

<script setup>
import WelcomeMessage from '@/components/WelcomeMessage.vue';
import ShowcaseSection from '@/components/ShowcaseSection.vue';
import MediaPlayer from '@/components/MediaPlayer.vue';
</script>
