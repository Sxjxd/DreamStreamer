<template>
  <!-- Breadcrumbs Section -->
  <div class="p-4">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
  </div>

  <!-- Add Track Button and Form -->
  <div class="p-4">
    <!-- Button to toggle Add Track Form -->
    <button
        @click="showAddTrackForm = !showAddTrackForm"
        class="m-4 bg-blue-600 text-white font-semibold text-lg p-4 rounded-md hover:bg-blue-700"
    >
      {{ showAddTrackForm ? 'Hide Add Track Form' : 'Add New Track' }}
    </button>

    <!-- Add Track Form -->
    <AddTrack v-if="showAddTrackForm" @trackAdded="fetchTracks" />
  </div>

  <!-- Track List -->
  <div class="p-2">
    <TrackList :tracks="tracks" @trackDeleted="fetchTracks" @editTrack="editTrack" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getTracks } from '@/services/api';
import AddTrack from '@/components/Admin/AddTrack.vue';
import TrackList from '@/components/Admin/TrackList.vue';
import Breadcrumbs from '@/components/Admin/Breadcrumbs.vue';

const tracks = ref([]);
const showAddTrackForm = ref(false);
const router = useRouter();

// Breadcrumbs array
const breadcrumbs = [
  { name: 'Dashboard', url: '/admin' },
  { name: 'Manage Tracks', url: '/admin/tracks' }
];

// Fetch all tracks when the component is mounted
const fetchTracks = async () => {
  try {
    const response = await getTracks();
    if (Array.isArray(response)) {
      tracks.value = response;
    } else {
      alert('Failed to fetch tracks');
    }
  } catch (error) {
    console.error('Error fetching tracks:', error);
  }
};

// Navigate to edit track page
const editTrack = (trackId) => {
  router.push(`/admin/tracks/${trackId}`);
};

onMounted(fetchTracks);
</script>

<style scoped>
button:hover {
  transform: scale(1.05);
  transition: all 0.2s ease;
}
</style>
