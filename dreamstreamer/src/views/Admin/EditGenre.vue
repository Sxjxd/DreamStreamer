<template>
  <div class="edit-genre bg-white p-8 max-w-2xl mx-auto rounded-lg shadow-md">
    <!-- Breadcrumbs for easier navigation -->
    <nav aria-label="breadcrumb" class="mb-6">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <router-link to="/admin" class="text-gray-600 hover:text-purple-500 text-sm font-medium">
            Dashboard
          </router-link>
        </li>
        <li>
          <svg class="w-4 h-4 text-gray-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </li>
        <li>
          <router-link to="/admin/genres" class="text-gray-600 hover:text-purple-500 text-sm font-medium">
            Genres
          </router-link>
        </li>
        <li>
          <svg class="w-4 h-4 text-gray-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </li>
        <li aria-current="page">
          <span class="text-gray-500 text-sm font-medium">Edit Genre</span>
        </li>
      </ol>
    </nav>

    <!-- Page title and description -->
    <div class="mb-6">
      <h2 class="text-3xl font-bold text-gray-800 mb-2">Edit Genre</h2>
      <p class="text-gray-600 text-sm">
        Update the genre details below. Ensure that all required fields are filled out correctly.
      </p>
    </div>

    <!-- Form Section -->
    <form @submit.prevent="handleUpdateGenre" class="space-y-6">
      <!-- Genre Name -->
      <div class="mb-6">
        <label for="name" class="block text-lg font-medium text-gray-700 mb-2">Genre Name</label>
        <input
            v-model="genre.name"
            type="text"
            id="name"
            class="mt-1 block w-full border-gray-300 bg-white text-gray-700 rounded-lg shadow-sm focus:border-purple-400 focus:ring-purple-400 px-4 py-3"
            placeholder="Enter genre name"
            required
        />
      </div>

      <!-- Save Button with Loading Spinner -->
      <div class="flex justify-between items-center">
        <button
            type="submit"
            :disabled="isLoading"
            class="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring focus:ring-purple-300"
        >
          <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
          <span v-else>Save Changes</span>
        </button>

        <!-- Cancel button for easier navigation -->
        <router-link
            to="/admin/genres"
            class="text-gray-500 hover:text-gray-600 font-semibold text-sm transition-colors"
        >
          Cancel
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getGenreById, updateGenre } from '@/services/api';

const genre = ref({
  name: '',
});
const isLoading = ref(false);

const route = useRoute();
const router = useRouter();
const genreId = route.params.genreId;

const fetchGenre = async () => {
  isLoading.value = true;
  try {
    const response = await getGenreById(genreId);
    genre.value = {
      name: response.Name,
    };
  } catch (error) {
    console.error('Error fetching genre:', error);
    alert('Failed to fetch genre details.');
  } finally {
    isLoading.value = false;
  }
};

const handleUpdateGenre = async () => {
  isLoading.value = true;
  try {
    await updateGenre(genreId, genre.value);
    alert('Genre updated successfully');
    router.push('/admin/genres');
  } catch (error) {
    console.error('Error updating genre:', error);
    alert('Failed to update genre.');
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchGenre);
</script>

<style scoped>
button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner-border {
  border-top-color: #fff;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #fff;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
