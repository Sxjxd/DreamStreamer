<template>
  <div class="bg-white p-8 rounded-lg shadow-md max-w-xl mx-auto">
    <h3 class="text-2xl font-bold text-gray-800 mb-6">Add New Album</h3>
    <form @submit.prevent="addAlbum" class="space-y-6">

      <!-- Album Title -->
      <div>
        <label for="title" class="block text-lg font-semibold text-gray-700 mb-2">Album Title</label>
        <input
            v-model="newAlbum.title"
            type="text"
            id="title"
            class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 text-gray-800"
            placeholder="Enter album title"
            required
            :disabled="isLoading"
        />
      </div>

      <!-- Artist Dropdown -->
      <div>
        <label for="artistId" class="block text-lg font-semibold text-gray-700 mb-2">Select Artist</label>
        <select
            v-model="newAlbum.artistId"
            id="artistId"
            class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 text-gray-800"
            required
            :disabled="isLoading || isFetching"
        >
          <option value="" disabled>Select artist</option>
          <option v-for="artist in artists" :key="artist.ArtistID" :value="artist.ArtistID">
            {{ artist.Name }}
          </option>
        </select>
        <span v-if="isFetching" class="text-sm text-gray-600">Loading artists...</span>
      </div>

      <!-- Genre Dropdown -->
      <div>
        <label for="genreId" class="block text-lg font-semibold text-gray-700 mb-2">Select Genre</label>
        <select
            v-model="newAlbum.genreId"
            id="genreId"
            class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 text-gray-800"
            required
            :disabled="isLoading || isFetching"
        >
          <option value="" disabled>Select genre</option>
          <option v-for="genre in genres" :key="genre.GenreID" :value="genre.GenreID">
            {{ genre.Name }}
          </option>
        </select>
        <span v-if="isFetching" class="text-sm text-gray-600">Loading genres...</span>
      </div>

      <!-- Release Year -->
      <div>
        <label for="releaseYear" class="block text-lg font-semibold text-gray-700 mb-2">Release Year</label>
        <input
            v-model="newAlbum.releaseYear"
            type="number"
            id="releaseYear"
            class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 text-gray-800"
            placeholder="Enter release year"
            required
            :disabled="isLoading"
        />
      </div>

      <!-- Upload Album Cover -->
      <div>
        <label for="coverFile" class="block text-lg font-semibold text-gray-700 mb-2">Album Cover</label>
        <input
            @change="handleCoverUpload"
            type="file"
            id="coverFile"
            class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm px-4 py-2"
            accept="image/jpeg, image/webp"
            required
            :disabled="isLoading"
        />
        <span v-if="isUploading" class="text-sm text-gray-600">Uploading cover...</span>
      </div>

      <!-- Submit Button -->
      <div class="pt-4">
        <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md text-lg font-semibold focus:ring focus:ring-blue-300 focus:outline-none transition-transform transform hover:scale-105"
            :disabled="isLoading || isUploading"
        >
          <span v-if="isLoading">Adding Album...</span>
          <span v-else>Add Album</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {createAlbum, getArtists, getGenres} from '@/services/api';

// Define the emit function
const emit = defineEmits(['albumAdded']);

const isLoading = ref(false);
const isFetching = ref(false);
const isUploading = ref(false);
const uploadError = ref(null); // To track any upload errors

// Album data
const newAlbum = ref({
  title: '',
  artistId: '',
  genreId: '',
  releaseYear: '',
  coverFileBase64: '',
  coverFileName: ''
});

// Fetch artists and genres
const artists = ref([]);
const genres = ref([]);

const fetchArtistsAndGenres = async () => {
  try {
    isFetching.value = true;
    const fetchedArtists = await getArtists();
    const fetchedGenres = await getGenres();

    artists.value = JSON.parse(fetchedArtists.body);
    genres.value = JSON.parse(fetchedGenres.body);
  } catch (error) {
    console.error('Error fetching artists or genres:', error);
    alert('Failed to fetch artists or genres');
  } finally {
    isFetching.value = false;
  }
};

// Handle file upload
const handleCoverUpload = (event) => {
  const file = event.target.files[0];
  if (!file) {
    uploadError.value = 'No file selected';
    return;
  }

  const reader = new FileReader();
  isUploading.value = true;

  reader.onload = (e) => {
    const fileResult = e.target.result;
    if (fileResult) {
      newAlbum.value.coverFileBase64 = fileResult.split(',')[1]; // Strip Base64 metadata
      newAlbum.value.coverFileName = file.name;
      isUploading.value = false;
      uploadError.value = null; // Clear any previous errors
    } else {
      uploadError.value = 'Failed to load the file';
      isUploading.value = false;
    }
  };

  reader.onerror = () => {
    uploadError.value = 'Error reading the file';
    isUploading.value = false;
  };

  reader.readAsDataURL(file);
};

// Add Album
const addAlbum = async () => {
  if (!newAlbum.value.coverFileBase64) {
    alert('Please upload an album cover.');
    return;
  }

  try {
    isLoading.value = true;
    await createAlbum(newAlbum.value);
    alert('Album added successfully');
    emit('albumAdded'); // Emit event to parent
    newAlbum.value = {
      title: '',
      artistId: '',
      genreId: '',
      releaseYear: '',
      coverFileBase64: '',
      coverFileName: ''
    };
  } catch (error) {
    console.error('Error adding album:', error);
    alert('Error adding album');
  } finally {
    isLoading.value = false;
  }
};

// Fetch artists and genres on component mount
onMounted(fetchArtistsAndGenres);
</script>

<style scoped>
button:hover {
  transform: scale(1.05);
  transition: all 0.3s ease;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
}
</style>
