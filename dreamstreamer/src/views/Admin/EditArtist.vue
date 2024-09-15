<template>
  <div class="edit-artist p-8 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
    <h2 class="text-3xl font-extrabold mb-6 text-center text-gray-800">Edit Artist</h2>

    <form @submit.prevent="handleUpdateArtist" class="space-y-6">
      <!-- Artist Name -->
      <div>
        <label for="name" class="block text-lg font-semibold text-gray-700 mb-2">Artist Name</label>
        <input
            v-model="artist.name"
            type="text"
            id="name"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            placeholder="Enter artist name"
            aria-label="Artist Name"
            required
        />
      </div>

      <!-- Buttons (Save and Cancel) -->
      <div class="flex justify-between space-x-4">
        <!-- Save Button -->
        <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            aria-label="Save Changes"
        >
          Save Changes
        </button>

        <!-- Cancel Button -->
        <button
            type="button"
            @click="router.push('/admin/artists')"
            class="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            aria-label="Cancel"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getArtistById, updateArtist } from '@/services/api'; // Ensure correct path to API

// Define reactive artist object
const artist = ref({
  name: '',
});

const route = useRoute();
const router = useRouter();
const artistId = route.params.artistId;

// Fetch the artist details
const fetchArtist = async () => {
  try {
    const response = await getArtistById(artistId);
    artist.value = {
      name: response.Name,
    };
  } catch (error) {
    console.error('Error fetching artist:', error);
    alert('Failed to fetch artist details.');
  }
};

// Update artist details
const handleUpdateArtist = async () => {
  try {
    // Create a plain object from the reactive object
    const artistData = { ...artist.value };
    await updateArtist(artistId, artistData);
    alert('Artist updated successfully');
    router.push('/admin/artists'); // Redirect to manage artists page
  } catch (error) {
    console.error('Error updating artist:', error);
    alert('Failed to update artist.');
  }
};

// Fetch artist details when the component is mounted
onMounted(fetchArtist);
</script>

<style scoped>
/* Container styling */
.edit-artist {
  background-color: #f9fafb;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Button hover effect */
button:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

/* Button focus effect for accessibility */
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}
</style>
