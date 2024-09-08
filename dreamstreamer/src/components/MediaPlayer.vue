<template>
  <div class="fixed bottom-0 left-0 w-full bg-gray-900 text-white py-4 shadow-lg z-50 flex flex-col md:flex-row justify-between items-center px-4 space-y-2 md:space-y-0">
    <!-- Current Song Info -->
    <div class="flex items-center space-x-4">
      <img :src="currentSong.cover" alt="Song Cover" class="w-12 h-12 md:w-16 md:h-16 rounded-md object-cover" />
      <div class="truncate">
        <h3 class="text-lg font-semibold truncate">{{ currentSong.title }}</h3>
        <p class="text-sm text-gray-400 truncate">{{ currentSong.artist }}</p>
      </div>
    </div>

    <!-- Playback Controls -->
    <div class="flex items-center space-x-4 md:space-x-6">
      <button @click="prevTrack" class="focus:outline-none hover:bg-gray-700 p-2 rounded-full">
        <font-awesome-icon icon="step-backward" class="text-xl" />
      </button>
      <button @click="togglePlayPause" class="focus:outline-none hover:bg-gray-700 p-2 rounded-full">
        <font-awesome-icon :icon="isPlaying ? 'pause' : 'play'" class="text-xl" />
      </button>
      <button @click="nextTrack" class="focus:outline-none hover:bg-gray-700 p-2 rounded-full">
        <font-awesome-icon icon="step-forward" class="text-xl" />
      </button>
    </div>

    <!-- Volume Control (hidden on small screens, shown on larger screens) -->
    <div class="hidden md:flex items-center space-x-2">
      <button @click="toggleMute" class="focus:outline-none hover:bg-gray-700 p-2 rounded-full">
        <font-awesome-icon :icon="isMuted ? 'volume-mute' : 'volume-up'" class="text-xl" />
      </button>
      <input type="range" min="0" max="100" v-model="volume" @input="changeVolume" class="w-24" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isPlaying = ref(false);
const isMuted = ref(false);
const volume = ref(100);

// Placeholder song data
const currentSong = ref({
  title: 'Sample Song',
  artist: 'Sample Artist',
  cover: 'https://via.placeholder.com/150', // Replace with actual song data
});

// Toggle play/pause
const togglePlayPause = () => {
  isPlaying.value = !isPlaying.value;
};

// Play the next track
const nextTrack = () => {
  // Logic to go to the next track
  console.log('Next track');
};

// Play the previous track
const prevTrack = () => {
  // Logic to go to the previous track
  console.log('Previous track');
};

// Toggle mute/unmute
const toggleMute = () => {
  isMuted.value = !isMuted.value;
};

// Change volume
const changeVolume = () => {
  console.log(`Volume set to: ${volume.value}`);
};
</script>

<style scoped>
/* Custom styling for the media player and range input */
input[type="range"] {
  appearance: none;
  width: 100%;
  height: 4px;
  background: #fff;
  border-radius: 2px;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #4f46e5; /* Purple thumb */
}

button:hover {
  background-color: rgba(75, 85, 99, 0.6); /* Slightly transparent background */
  transition: background-color 0.3s ease;
}
</style>
