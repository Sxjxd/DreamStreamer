<template>
  <!-- Breadcrumbs Section -->
  <div class="p-2">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
  </div>

  <!-- Add Genre Button and Form -->
  <div class="p-2">
    <!-- Button to toggle Add Genre Form -->
    <button
        @click="showAddGenreForm = !showAddGenreForm"
        class="m-2 bg-purple-600 text-white font-semibold text-md px-6 py-3 rounded-full hover:bg-purple-700 transition-transform transform hover:scale-105 focus:ring focus:ring-purple-300"
    >
      {{ showAddGenreForm ? 'Hide Add Genre Form' : 'Add New Genre' }}
    </button>

    <!-- Add Genre Form -->
    <AddGenre v-if="showAddGenreForm" @genreAdded="fetchGenres" />
  </div>

  <!-- Genre List -->
  <div class="p-4">
    <GenreList :genres="genres" @genreDeleted="fetchGenres" @editGenre="editGenre" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getGenres } from '@/services/api';
import AddGenre from '@/components/Admin/AddGenre.vue';
import GenreList from '@/components/Admin/GenreList.vue';
import Breadcrumbs from '@/components/Admin/Breadcrumbs.vue';

const genres = ref([]);
const showAddGenreForm = ref(false);
const router = useRouter();

// Breadcrumbs array for navigation
const breadcrumbs = [
  { name: 'Dashboard', url: '/admin' },
  { name: 'Manage Genres', url: '/admin/genres' }
];

// Fetch all genres when component is mounted
const fetchGenres = async () => {
  try {
    const response = await getGenres();
    genres.value = JSON.parse(response.body);  // Parse the response body into an array
  } catch (error) {
    console.error('Error fetching genres:', error);
    alert('Failed to fetch genres.');
  }
};

// Navigate to edit genre page
const editGenre = (genreId) => {
  router.push(`/admin/genres/edit/${genreId}`);
};

onMounted(fetchGenres);
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
