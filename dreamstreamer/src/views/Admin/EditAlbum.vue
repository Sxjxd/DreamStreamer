<template>
  <div class="edit-album p-8 max-w-2xl mx-auto bg-white shadow-lg rounded-md">
    <!-- Back Button -->
    <div class="flex justify-start mb-4">
      <button
          @click="goBack"
          class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md shadow-md focus:outline-none transition duration-200"
      >
        Back to Albums
      </button>
    </div>

    <h2 class="text-3xl font-bold mb-6 text-gray-800">Edit Album</h2>

    <form @submit.prevent="handleUpdateAlbum" class="space-y-6">
      <!-- Album Title -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Album Title</label>
        <input
            v-model="album.title"
            type="text"
            id="title"
            class="text-black mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter album title"
            required
            aria-label="Album Title"
        />
      </div>

      <!-- Artist -->
      <div>
        <label for="artist" class="block text-sm font-medium text-gray-700">Artist</label>
        <select
            v-model="album.artistId"
            id="artist"
            class="text-black mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            aria-label="Select Artist"
        >
          <option disabled value="">Select an artist</option>
          <option v-for="artist in artists" :key="artist.ArtistID" :value="artist.ArtistID">
            {{ artist.Name }}
          </option>
        </select>
      </div>

      <!-- Genre -->
      <div>
        <label for="genre" class="block text-sm font-medium text-gray-700">Genre</label>
        <select
            v-model="album.genreId"
            id="genre"
            class="text-black mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            aria-label="Select Genre"
        >
          <option disabled value="">Select a genre</option>
          <option v-for="genre in genres" :key="genre.GenreID" :value="genre.GenreID">
            {{ genre.Name }}
          </option>
        </select>
      </div>

      <!-- Release Year -->
      <div>
        <label for="year" class="block text-sm font-medium text-gray-700">Release Year</label>
        <input
            v-model="album.releaseYear"
            type="number"
            id="year"
            class="text-black mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter release year"
            required
            aria-label="Release Year"
        />
      </div>

      <!-- Display Current Cover -->
      <div v-if="album.coverUrl" class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Current Cover:</label>
        <img :src="album.coverUrl" alt="Album Cover" class="w-32 h-32 object-cover rounded-md mt-2" />
      </div>

      <!-- File Upload -->
      <div>
        <label for="cover" class="block text-sm font-medium text-gray-700">Upload New Cover</label>
        <input
            type="file"
            @change="handleFileUpload"
            class="block w-full text-gray-700 border border-gray-300 rounded-lg shadow-sm px-4 py-2"
            accept="image/*"
        />
      </div>

      <!-- Save Button -->
      <div class="flex justify-end">
        <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md focus:ring-4 focus:ring-blue-300 focus:outline-none transition duration-200"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getAlbumById, getArtists, getGenres, updateAlbum, getPresignedUrl } from '@/services/api';

const album = ref({
  title: '',
  artistId: '',
  genreId: '',
  releaseYear: '',
  coverUrl: '', // Will hold the URL of the uploaded cover image
});

const artists = ref([]);
const genres = ref([]);

const route = useRoute();
const albumId = route.params.albumId;
const router = useRouter();

const fetchAlbum = async () => {
  try {
    const response = await getAlbumById(albumId);
    album.value = {
      title: response.Title,
      artistId: response.ArtistID,
      genreId: response.GenreID,
      releaseYear: response.ReleaseYear,
      coverUrl: response.CoverURL,
    };
  } catch (error) {
    console.error('Error fetching album:', error);
    alert('Failed to fetch album details.');
  }
};

const fetchArtistsAndGenres = async () => {
  try {
    const artistsResponse = await getArtists();
    const genresResponse = await getGenres();
    artists.value = JSON.parse(artistsResponse.body);
    genres.value = JSON.parse(genresResponse.body);
  } catch (error) {
    console.error('Error fetching artists or genres:', error);
    alert('Failed to load artists or genres.');
  }
};

// Handle file upload and S3 presigned URL
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    // Get the presigned URL from the backend
    const { uploadURL, fileUrl } = await getPresignedUrl(file.name, file.type);

    // Upload the file to the S3 bucket
    const response = await fetch(uploadURL, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    });

    if (!response.ok) throw new Error('Failed to upload the cover image');

    // Update the album cover URL after a successful upload
    album.value.coverUrl = fileUrl;
    console.log('File uploaded successfully and cover URL updated:', fileUrl);
  } catch (error) {
    console.error('Error during file upload:', error);
    alert('Failed to upload the cover image');
  }
};

const handleUpdateAlbum = async () => {
  try {
    await updateAlbum(albumId, album.value);
    alert('Album updated successfully');
    router.push('/admin/albums');
  } catch (error) {
    console.error('Error updating album:', error);
    alert('Failed to update album.');
  }
};

// Function to handle back button navigation
const goBack = () => {
  router.push('/admin/albums');
};

onMounted(() => {
  fetchAlbum();
  fetchArtistsAndGenres();
});
</script>

<style scoped>
button:hover {
  transform: scale(1.05);
  transition: all 0.2s ease;
}
</style>
