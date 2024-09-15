<template>
  <div>
    <!-- Loading state for fetching tracks -->
    <div v-if="loading" class="text-center py-4">
      <span class="text-gray-600">Loading tracks...</span>
    </div>

    <!-- Tracks Table -->
    <table v-else class="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
      <thead>
      <tr class="bg-gray-200 text-gray-700 font-semibold text-sm">
        <th class="py-3 px-6 text-left">Track Cover</th> <!-- Added Track Cover column -->
        <th class="py-3 px-6 text-left">Track Title</th>
        <th class="py-3 px-6 text-left">Artist</th>
        <th class="py-3 px-6 text-left">Album</th>
        <th class="py-3 px-6 text-left">Label</th>
        <th class="py-3 px-6 text-center">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="track in tracks" :key="track.TrackID" class="border-b hover:bg-gray-100">
        <!-- Display Track Cover -->
        <td class="py-3 px-6 text-left text-gray-800 cursor-pointer" @click="playTrack(track)">
          <img
              :src="track.ThumbnailURL || 'default-thumbnail.png'"
              alt="Track Cover"
              class="w-12 h-12 object-cover rounded-md"
          />
        </td>

        <td class="py-3 px-6 text-left text-gray-800">{{ track.Title }}</td>
        <td class="py-3 px-6 text-left text-gray-600">{{ track.ArtistName }}</td>
        <td class="py-3 px-6 text-left text-gray-600">{{ track.AlbumTitle }}</td>
        <td class="py-3 px-6 text-left text-gray-600">{{ track.Label }}</td>
        <td class="py-3 px-6 text-center">
          <!-- Edit Button -->
          <button
              @click="editTrack(track.TrackID)"
              class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
              :disabled="loading"
          >
            Edit
          </button>

          <!-- Delete Button -->
          <button
              @click="deleteTrack(track.TrackID)"
              class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 ml-2"
              :disabled="loading || deletingTrackId === track.TrackID"
          >
            <span v-if="deletingTrackId === track.TrackID">Deleting...</span>
            <span v-else>Delete</span>
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Media Player Section (Visible when a track is selected) -->
    <div v-if="currentTrack" class="fixed bottom-0 left-0 w-full bg-gray-900 text-white py-4 shadow-lg z-50 flex justify-between items-center px-6">
      <div class="flex items-center">
        <img :src="currentTrack.ThumbnailURL || 'default-thumbnail.png'" alt="Track Cover" class="w-12 h-12 object-cover rounded-md mr-4" />
        <div>
          <h3 class="text-lg font-semibold">{{ currentTrack.Title }}</h3>
          <p class="text-sm text-gray-400">{{ currentTrack.ArtistName }}</p>
        </div>
      </div>

      <audio :src="currentTrack.FileURL" ref="audioPlayer" controls class="w-1/3"></audio>

      <button @click="stopTrack" class="text-white bg-red-600 p-2 rounded-md ml-4 hover:bg-red-700">
        Stop
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { deleteTrack as apiDeleteTrack, getTracks } from '@/services/api';

const router = useRouter();

// State for tracks, loading, deleting, and current track
const tracks = ref([]);
const loading = ref(true);
const deletingTrackId = ref(null);
const currentTrack = ref(null); // Currently playing track

// Fetch tracks from API
const fetchTracks = async () => {
  loading.value = true;
  try {
    const response = await getTracks();
    if (Array.isArray(response)) {
      tracks.value = response;
    } else {
      alert('Failed to fetch tracks');
    }
  } catch (error) {
    console.error('Error fetching tracks:', error);
    alert('Failed to fetch tracks.');
  } finally {
    loading.value = false;
  }
};

// Play the selected track
const playTrack = (track) => {
  currentTrack.value = track; // Set the selected track to the current track
  const audioPlayer = document.querySelector('audio');
  if (audioPlayer) {
    audioPlayer.play(); // Automatically start playing the track
  }
};

// Stop the current track
const stopTrack = () => {
  const audioPlayer = document.querySelector('audio');
  if (audioPlayer) {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  }
  currentTrack.value = null;
};

// Edit track functionality
const editTrack = (trackId) => {
  router.push(`/admin/tracks/${trackId}`);
};

// Delete track functionality
const deleteTrack = async (trackId) => {
  if (confirm('Are you sure you want to delete this track?')) {
    deletingTrackId.value = trackId;
    try {
      await apiDeleteTrack(trackId);
      alert('Track deleted successfully');
      await fetchTracks();
    } catch (error) {
      console.error('Error deleting track:', error);
      alert('Failed to delete track.');
    } finally {
      deletingTrackId.value = null;
    }
  }
};

// Fetch tracks on component mount
fetchTracks();
</script>

<style scoped>
button:hover {
  transform: scale(1.05);
  transition: all 0.2s ease;
}

button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

img {
  cursor: pointer;
}
</style>
