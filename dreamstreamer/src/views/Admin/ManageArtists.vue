<template>
  <!-- Breadcrumbs Section -->
  <div class="p-4">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
  </div>

  <!-- Add Artist Button and Form -->
  <div class="p-3">
    <!-- Button to toggle Add Artist Form -->
    <button
        @click="toggleAddArtistForm"
        class="m-2 bg-purple-600 text-white font-semibold text-md px-6 py-3 rounded-full hover:bg-purple-700 transition-transform transform hover:scale-105 focus:ring focus:ring-purple-300"
    >
      {{ showAddArtistForm ? 'Hide Add Artist Form' : 'Add New Artist' }}
    </button>

    <!-- Add Artist Form -->
    <AddArtist v-if="showAddArtistForm" @artistAdded="fetchArtists" />
  </div>

  <!-- Artist List -->
  <div class="p-4">
    <ArtistsList :artists="artists" @artistUpdated="fetchArtists" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getArtists } from '@/services/api';
import AddArtist from '@/components/Admin/AddArtist.vue';
import ArtistsList from '@/components/Admin/ArtistList.vue';
import Breadcrumbs from '@/components/Admin/Breadcrumbs.vue'; // Breadcrumbs component

// Reactive variables
const artists = ref([]);
const showAddArtistForm = ref(false);

// Breadcrumbs array for navigation
const breadcrumbs = [
  { name: 'Dashboard', url: '/admin' },
  { name: 'Manage Artists', url: '/admin/artists' }
];

// Fetch all artists when component is mounted
const fetchArtists = async () => {
  try {
    const response = await getArtists();
    artists.value = JSON.parse(response.body);  // Parse the response body into an array
  } catch (error) {
    console.error('Error fetching artists:', error);
    alert('Failed to fetch artists.');
  }
};

// Toggle Add Artist Form visibility
const toggleAddArtistForm = () => {
  showAddArtistForm.value = !showAddArtistForm.value;
};

// Listen for artist deletion to refresh the list
document.addEventListener('artistDeleted', fetchArtists);

// Fetch artists on component mount
onMounted(fetchArtists);
</script>

<style scoped>
button:hover {
  transform: scale(1.05);
  transition: all 0.3s ease;
}

.p-4 {
  padding: 1rem;
}

h1 {
  margin-bottom: 1.5rem;
}
</style>
