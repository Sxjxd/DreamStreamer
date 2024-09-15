<template>
  <div class="add-genre bg-white p-6 rounded-lg shadow-lg max-w-md">
    <h3 class="text-xl font-bold text-gray-800 mb-4">Add New Genre</h3>
    <form @submit.prevent="handleAddGenre">
      <div>
        <label for="genreName" class="block text-sm font-medium text-gray-700 mb-2">Genre Name</label>
        <input
            v-model="newGenre.name"
            type="text"
            id="genreName"
            class="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter genre name"
            required
        />
      </div>
      <div class="mt-4">
        <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 focus:ring focus:ring-indigo-300 transition-transform transform hover:scale-105">
          Add Genre
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { createGenre } from '@/services/api';

const newGenre = ref({
  name: '',
});

const emit = defineEmits(['genreAdded']);

const handleAddGenre = async () => {
  try {
    await createGenre(newGenre.value);
    alert('Genre added successfully');
    newGenre.value.name = ''; // Clear form
    emit('genreAdded'); // Emit event to refresh the list
  } catch (error) {
    console.error('Error adding genre:', error);
    alert('Failed to add genre.');
  }
};
</script>

<style scoped>
button:hover {
  transform: scale(1.05);
  transition: all 0.3s ease;
}
</style>
