<template>
  <div class="artist-list">
    <table class="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
      <thead>
      <tr class="bg-gray-200 text-gray-700 font-semibold text-sm">
        <th class="py-3 px-6 text-left">Artist Name</th>
        <th class="py-3 px-6 text-center">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="artist in artists" :key="artist.ArtistID" class="border-b hover:bg-gray-100">
        <td class="py-3 px-6 text-left text-gray-800">{{ artist.Name }}</td>
        <td class="py-3 px-6 text-center">
          <!-- Edit and Delete Buttons -->
          <div class="flex justify-center space-x-4">
            <button
                @click="handleEditArtist(artist.ArtistID)"
                class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:ring focus:ring-yellow-300 transition-transform transform hover:scale-105"
            >
              Edit
            </button>
            <button
                @click="confirmDeleteArtist(artist.ArtistID)"
                class="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 focus:ring focus:ring-red-300 transition-transform transform hover:scale-105"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { deleteArtist } from '@/services/api';

const props = defineProps({
  artists: {
    type: Array,
    required: true,
  },
});

const router = useRouter();

// Function to confirm and delete the artist
const confirmDeleteArtist = async (artistId) => {
  if (confirm('Are you sure you want to delete this artist?')) {
    try {
      await deleteArtist(artistId); // Call deleteArtist API
      alert('Artist deleted successfully');
      document.dispatchEvent(new CustomEvent('artistDeleted')); // Emit event to refresh the artist list
    } catch (error) {
      console.error('Error deleting artist:', error);
      alert('Failed to delete artist.');
    }
  }
};

// Function to handle editing the artist
const handleEditArtist = (artistId) => {
  router.push({
    name: 'EditArtist', // Route name for editing the artist
    params: { artistId }, // Pass the artistId as a route param
  });
};
</script>

<style scoped>
button:hover {
  transform: scale(1.05);
  transition: all 0.2s ease;
}
</style>
