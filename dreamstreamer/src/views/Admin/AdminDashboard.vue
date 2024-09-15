<template>
  <div class="admin-dashboard p-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <button @click="$router.push('/admin/albums')" class="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700">
        Manage Albums
      </button>
      <button @click="$router.push('/admin/tracks')" class="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700">
        Manage Tracks
      </button>
      <button @click="$router.push('/admin/genres')" class="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700">
        Manage Genres
      </button>
      <button @click="$router.push('/admin/artists')" class="bg-red-600 text-white p-4 rounded-lg hover:bg-red-700">
        Manage Artists
      </button>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background-color: #f9fafb;
}
</style>
