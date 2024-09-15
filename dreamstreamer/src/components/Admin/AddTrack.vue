<template>
  <div class="bg-white p-8 rounded-lg shadow-md max-w-xl mx-auto">
    <h3 class="text-2xl font-bold text-gray-800 mb-6">Add New Track</h3>
    <form @submit.prevent="addTrack" class="space-y-6">
      <!-- Track Title -->
      <div>
        <label for="title" class="block text-lg font-semibold text-gray-700 mb-2">Track Title</label>
        <input
            v-model="newTrack.title"
            type="text"
            id="title"
            class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 text-gray-800"
            placeholder="Enter track title"
            required
        />
      </div>

      <!-- Artist Dropdown -->
      <div>
        <label for="artistId" class="block text-lg font-semibold text-gray-700 mb-2">Select Artist</label>
        <select
            v-model="newTrack.artistId"
            id="artistId"
            class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 text-gray-800"
            required
        >
          <option value="" disabled>Select artist</option>
          <option v-for="artist in artists" :key="artist.ArtistID" :value="artist.ArtistID">
            {{ artist.Name }}
          </option>
        </select>
      </div>

      <!-- Album Dropdown -->
      <div>
        <label for="albumId" class="block text-lg font-semibold text-gray-700 mb-2">Select Album</label>
        <select
            v-model="newTrack.albumId"
            id="albumId"
            class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 text-gray-800"
            required
        >
          <option value="" disabled>Select album</option>
          <option v-for="album in albums" :key="album.AlbumID" :value="album.AlbumID">
            {{ album.Title }}
          </option>
        </select>
      </div>

      <!-- Label -->
      <div>
        <label for="label" class="block text-lg font-semibold text-gray-700 mb-2">Track Label</label>
        <input
            v-model="newTrack.label"
            type="text"
            id="label"
            class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 text-gray-800"
            placeholder="Enter track label"
            required
        />
      </div>

      <!-- Upload Track File -->
      <div>
        <label for="trackFile" class="block text-lg font-semibold text-gray-700 mb-2">Upload Track File</label>
        <input
            @change="handleFileUpload('song', $event)"
            type="file"
            id="trackFile"
            class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm px-4 py-2"
            accept="audio/*"
            required
        />
      </div>

      <!-- Upload Track Cover -->
      <div>
        <label for="trackCover" class="block text-lg font-semibold text-gray-700 mb-2">Upload Track Cover</label>
        <input
            @change="handleFileUpload('cover', $event)"
            type="file"
            id="trackCover"
            class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm px-4 py-2"
            accept="image/*"
        />
      </div>

      <!-- Progress Bar -->
      <div v-if="isUploading" class="h-2 bg-gray-300 rounded-full overflow-hidden">
        <div class="h-full bg-blue-600" :style="{ width: `${uploadProgress}%` }"></div>
      </div>

      <!-- Save Button -->
      <div class="pt-4">
        <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md text-lg font-semibold focus:ring focus:ring-blue-300 focus:outline-none transition-transform transform hover:scale-105"
            :disabled="isUploading"
        >
          {{ isUploading ? 'Uploading...' : 'Add Track' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getArtists, getAlbums, getPresignedUrl, createTrack } from '@/services/api'; // Ensure your API methods are set up

const newTrack = ref({
  title: '',
  artistId: '',
  albumId: '',
  duration: '', // Auto-calculated during file upload
  label: '',
  fileUrl: '', // This will hold the S3 URL after uploading
  thumbnailUrl: '' // This will hold the S3 URL of the track cover image
});

const artists = ref([]);
const albums = ref([]);
const isUploading = ref(false); // Track if the file is being uploaded
const uploadProgress = ref(0);  // Progress for the file upload

// Fetch artists and albums
const fetchArtistsAndAlbums = async () => {
  try {
    const fetchedArtists = await getArtists();
    const fetchedAlbums = await getAlbums();
    artists.value = JSON.parse(fetchedArtists.body);
    albums.value = JSON.parse(fetchedAlbums.body).albums;
  } catch (error) {
    console.error('Error fetching artists or albums:', error);
    alert('Failed to fetch artists or albums');
  }
};

// Handle track file and cover upload
const handleFileUpload = async (category, event) => {
  const file = event.target.files[0];
  if (!file) return;

  // If it's a song file, calculate its duration
  if (category === 'song') {
    const audio = new Audio(URL.createObjectURL(file));
    audio.onloadedmetadata = () => {
      newTrack.value.duration = Math.floor(audio.duration);
    };
  }

  try {
    // Request presigned URL from the backend for song or cover
    const {uploadURL, fileUrl} = await getPresignedUrl(file.name, file.type, category);

    // Start uploading the file to S3
    isUploading.value = true;
    uploadProgress.value = 0;

    const response = await fetch(uploadURL, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    if (response.ok) {
      if (category === 'song') {
        newTrack.value.fileUrl = fileUrl; // Set the fileUrl after successful upload
      } else if (category === 'cover') {
        newTrack.value.thumbnailUrl = fileUrl; // Set the thumbnailUrl after successful upload
      }
      uploadProgress.value = 100;
    } else {
      throw new Error('Failed to upload file to S3');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    alert(`Error uploading ${category}.`);
  } finally {
    isUploading.value = false; // End uploading
  }
};

// Add a new track
const addTrack = async () => {
  // Ensure the fileUrl is set properly
  if (!newTrack.value.fileUrl) {
    alert('File URL is missing. Please upload the track.');
    return;
  }

  try {
    await createTrack(newTrack.value);
    alert('Track added successfully');
    newTrack.value = {
      title: '',
      artistId: '',
      albumId: '',
      duration: '', // This is auto-calculated
      label: '',
      fileUrl: '',
      thumbnailUrl: ''
    }; // Reset the form
    window.location.reload(); // Reload the page to show the new track
  } catch (error) {
    console.error('Error adding track:', error);
    alert('Failed to add track');
  }
};

onMounted(fetchArtistsAndAlbums);
</script>

<style scoped>
button:hover {
  transform: scale(1.05);
  transition: all 0.3s ease;
}
</style>
