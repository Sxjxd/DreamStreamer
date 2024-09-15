<template>
  <div class="add-artist bg-white p-6 rounded-lg shadow-lg max-w-md">
    <h3 class="text-xl font-bold text-gray-800 mb-4">Add New Artist</h3>
    <form @submit.prevent="handleAddArtist">
      <div>
        <label for="artistName" class="block text-sm font-medium text-gray-700 mb-2">Artist Name</label>
        <input
            v-model="artistName"
            type="text"
            id="artistName"
            class="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter artist name"
            required
        />
      </div>
      <div class="mt-4">
        <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-transform transform hover:scale-105">
          Add Artist
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { createArtist } from '@/services/api'; // Ensure this path is correct for your project

// Bind the input to a reactive value
const artistName = ref('');

// Function to handle adding an artist
const handleAddArtist = async () => {
  try {
    const artistData = { name: artistName.value }; // Prepare the data object
    await createArtist(artistData); // Call the API directly with the object
    alert('Artist added successfully');
    artistName.value = ''; // Reset form after successful submission
    document.dispatchEvent(new CustomEvent('artistAdded')); // Optionally emit event to refresh artists
  } catch (error) {
    console.error('Error adding artist:', error);
    alert('Failed to add artist.');
  }
};
</script>

<style scoped>
button:hover {
  transform: scale(1.05);
  transition: all 0.2s ease;
}
</style>
