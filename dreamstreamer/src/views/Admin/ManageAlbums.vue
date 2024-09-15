<template>
  <!-- Breadcrumbs Section -->
  <div class="p-4">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
  </div>

  <!-- Add Album Button and Form -->
  <div class="p-4">
    <!-- Button to toggle Add Album Form -->
    <button
        @click="showAddAlbumForm = !showAddAlbumForm"
        class="bg-purple-600 text-white font-semibold text-md px-6 py-3 rounded-full hover:bg-purple-700 transition-transform transform hover:scale-105 focus:ring focus:ring-purple-300"
    >
      {{ showAddAlbumForm ? 'Hide Add Album Form' : 'Add New Album' }}
    </button>

    <!-- Add Album Form -->
    <AddAlbum v-if="showAddAlbumForm" @albumAdded="handleAlbumAdded" />
  </div>

  <!-- Album List -->
  <div class="p-4">
    <AlbumList :albums="albums" @deleteAlbum="confirmDeleteAlbum" @editAlbum="handleEditAlbum" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAlbums, deleteAlbum } from '@/services/api.js'; // Ensure API file paths are correct
import AlbumList from '@/components/Admin/AlbumList.vue';
import AddAlbum from '@/components/Admin/AddAlbum.vue';
import Breadcrumbs from '@/components/Admin/Breadcrumbs.vue'; // Import Breadcrumbs component
import { useRouter } from 'vue-router';

// Data for albums and form visibility
const albums = ref([]);
const showAddAlbumForm = ref(false);
const router = useRouter();

// Define breadcrumbs for navigation
const breadcrumbs = [
  { name: 'Dashboard', url: '/admin' },
  { name: 'Manage Albums', url: '/admin/albums' }
];

// Fetch albums from the backend
const fetchAlbums = async () => {
  try {
    const response = await getAlbums();
    const parsedResponse = JSON.parse(response.body);
    albums.value = parsedResponse.albums || []; // Safely assign the albums array
  } catch (error) {
    console.error('Error fetching albums:', error);
    alert('Failed to load albums');
  }
};

// Handle album addition (refresh album list)
const handleAlbumAdded = () => {
  fetchAlbums(); // Refresh album list
  showAddAlbumForm.value = false; // Hide the add album form
};

// Handle delete confirmation and deletion
const confirmDeleteAlbum = async (id) => {
  if (confirm('Are you sure you want to delete this album?')) {
    try {
      await deleteAlbum(id);
      fetchAlbums(); // Refresh the list after deletion
      alert('Album deleted successfully');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Failed to delete album: ${error.response.data.error}`);
      } else {
        console.error('Error deleting album:', error);
        alert('Failed to delete album due to an unknown error.');
      }
    }
  }
};

// Handle edit action (navigate to Edit Album page)
const handleEditAlbum = (album) => {
  router.push({
    name: 'EditAlbum',
    params: { albumId: album.AlbumID }
  });
};

// Fetch albums on mount
onMounted(fetchAlbums);
</script>

<style scoped>
button:hover {
  transform: scale(1.05);
  transition: all 0.3s ease;
}

.p-4 {
  padding: 1rem;
}
</style>
