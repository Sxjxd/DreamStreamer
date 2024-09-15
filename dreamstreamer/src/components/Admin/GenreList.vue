<template>
  <div>
    <table class="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
      <thead>
      <tr class="bg-gray-200 text-gray-700 font-semibold text-md">
        <th class="py-4 px-6 text-left">Genre Name</th>
        <th class="py-4 px-6 text-center">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="genre in genres" :key="genre.GenreID" class="border-b hover:bg-gray-100">
        <!-- Genre Name -->
        <td class="py-4 px-6 text-left text-gray-800 font-medium">{{ genre.Name }}</td>

        <!-- Actions: Edit and Delete -->
        <td class="py-4 px-6 text-center"> <!-- Text centered to match the header -->
          <div class="flex justify-center space-x-4">
            <!-- Edit Button -->
            <button
                @click="handleEditGenre(genre.GenreID)"
                class="bg-yellow-500 text-white px-5 py-3 rounded-full hover:bg-yellow-600 focus:ring focus:ring-yellow-300 transition-transform transform hover:scale-105"
            >
              Edit
            </button>

            <!-- Delete Button -->
            <button
                @click="confirmDeleteGenre(genre.GenreID)"
                class="bg-red-600 text-white px-5 py-3 rounded-full hover:bg-red-700 focus:ring focus:ring-red-300 transition-transform transform hover:scale-105"
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
import { deleteGenre } from '@/services/api';

const props = defineProps({
  genres: {
    type: Array,
    required: true,
  },
});

const router = useRouter();

// Function to confirm and delete the genre
const confirmDeleteGenre = async (genreId) => {
  if (confirm('Are you sure you want to delete this genre?')) {
    try {
      await deleteGenre(genreId);
      alert('Genre deleted successfully');
      // Emit event to refresh the genre list after deletion
      document.dispatchEvent(new CustomEvent('genreDeleted'));
    } catch (error) {
      console.error('Error deleting genre:', error);
      alert('Failed to delete genre.');
    }
  }
};

// Function to handle editing the genre
const handleEditGenre = (genreId) => {
  router.push({
    name: 'EditGenre',
    params: { genreId },
  });
};
</script>

<style scoped>
button:hover {
  transform: scale(1.05);
  transition: all 0.3s ease;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 16px;
  text-align: left;
}

th {
  font-weight: bold;
  background-color: #f0f0f0;
}

tr {
  transition: background-color 0.3s ease;
}

tr:hover {
  background-color: #f9f9f9;
}
</style>
