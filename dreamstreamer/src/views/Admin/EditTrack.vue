<template>
  <div class="bg-white p-8 rounded-lg shadow-md max-w-xl mx-auto">
    <h3 class="text-2xl font-bold text-gray-800 mb-6">Edit Track</h3>
    <form @submit.prevent="submitUpdateTrack" class="space-y-6">
      <!-- Track Title -->
      <div>
        <label for="title" class="block text-lg font-semibold text-gray-700 mb-2">Track Title</label>
        <input
            v-model="track.title"
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
            v-model="track.artistId"
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
            v-model="track.albumId"
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
            v-model="track.label"
            type="text"
            id="label"
            class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 text-gray-800"
            placeholder="Enter track label"
            required
        />
      </div>

      <!-- Track Cover Preview & Upload -->
      <div>
        <label for="thumbnail" class="block text-lg font-semibold text-gray-700 mb-2">Track Cover</label>
        <!-- Preview current track cover -->
        <div v-if="track.thumbnailUrl" class="mb-4">
          <p class="text-gray-700 mb-2">Current Cover:</p>
          <img :src="track.thumbnailUrl" alt="Track Cover" class="w-32 h-32 object-cover rounded-md" />
        </div>
        <p v-if="!newThumbnail" class="text-gray-500">No new cover chosen</p>
        <input
            type="file"
            @change="handleFileUpload('cover', $event)"
            class="block w-full text-gray-700 border border-gray-300 rounded-lg shadow-sm px-4 py-2"
            accept="image/*"
        />
      </div>

      <!-- Track File Preview & Upload with Audio Player -->
      <div>
        <label for="file" class="block text-lg font-semibold text-gray-700 mb-2">Track File</label>
        <!-- Audio player to play the current track -->
        <div v-if="track.fileUrl" class="mb-4">
          <p class="text-gray-700 mb-2">Current Track:</p>
          <audio controls :src="track.fileUrl" class="w-full"></audio>
        </div>
        <p v-if="!newTrackFile" class="text-gray-500">No new track file chosen</p>
        <input
            type="file"
            @change="handleFileUpload('song', $event)"
            class="block w-full text-gray-700 border border-gray-300 rounded-lg shadow-sm px-4 py-2"
            accept="audio/*"
        />
      </div>

      <!-- Buttons (Save and Cancel) -->
      <div class="pt-4 flex justify-between">
        <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md text-lg font-semibold focus:ring focus:ring-blue-300 focus:outline-none transition-transform transform hover:scale-105 mr-2"
        >
          Save Changes
        </button>
        <button
            type="button"
            @click="router.push('/admin/tracks')"
            class="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg shadow-md text-lg font-semibold focus:ring focus:ring-gray-300 focus:outline-none transition-transform transform hover:scale-105 ml-2"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {getTrackById, updateTrack, getArtists, getAlbums, getPresignedUrl} from '@/services/api';

const route = useRoute();
const router = useRouter();
const trackId = route.params.trackId;

const track = ref({
  title: '',
  artistId: '',
  albumId: '',
  label: '',
  fileUrl: '',
  thumbnailUrl: '',
  duration: 0, // Initialize duration
});

const newTrackFile = ref(false);
const newThumbnail = ref(false);
const artists = ref([]);
const albums = ref([]);

// Function to fetch track details
const fetchTrackDetails = async () => {
  try {
    const response = await getTrackById(trackId);
    track.value.title = response.Title;
    track.value.label = response.Label;
    track.value.fileUrl = response.FileURL;
    track.value.thumbnailUrl = response.ThumbnailURL || ''; // New thumbnail field

    const artist = artists.value.find(artist => artist.Name === response.ArtistName);
    const album = albums.value.find(album => album.Title === response.AlbumTitle);

    if (artist) track.value.artistId = artist.ArtistID;
    if (album) track.value.albumId = album.AlbumID;
  } catch (error) {
    console.error('Error fetching track:', error);
  }
};

// Function to fetch artists and albums
const fetchArtistsAndAlbums = async () => {
  try {
    const fetchedArtists = await getArtists();
    const fetchedAlbums = await getAlbums();

    artists.value = JSON.parse(fetchedArtists.body);
    albums.value = JSON.parse(fetchedAlbums.body)?.albums || [];

    await fetchTrackDetails(); // Fetch the track details after artists and albums are loaded
  } catch (error) {
    console.error('Error fetching artists or albums:', error);
  }
};

// Handle file upload
const handleFileUpload = async (category, event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (category === 'song') newTrackFile.value = true;
  if (category === 'cover') newThumbnail.value = true;

  // Calculate duration if it's a song
  if (category === 'song') {
    const audio = new Audio(URL.createObjectURL(file));
    audio.onloadedmetadata = () => {
      track.value.duration = Math.floor(audio.duration);
    };
  }

  try {
    const {uploadURL, fileUrl} = await getPresignedUrl(file.name, file.type, category);

    const response = await fetch(uploadURL, {
      method: 'PUT',
      headers: {'Content-Type': file.type},
      body: file
    });

    if (!response.ok) throw new Error('Failed to upload file');

    if (category === 'song') {
      track.value.fileUrl = fileUrl;
    } else if (category === 'cover') {
      track.value.thumbnailUrl = fileUrl;
    }
  } catch (error) {
    console.error(`Error uploading ${category}:`, error);
  }
};

// Submit track update
const submitUpdateTrack = async () => {
  try {
    await updateTrack(trackId, track.value);
    alert('Track updated successfully');
    router.push('/admin/tracks');
  } catch (error) {
    console.error('Error updating track:', error);
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
