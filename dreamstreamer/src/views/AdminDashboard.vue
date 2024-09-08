<template>
  <div class="bg-black text-gray-200 min-h-screen p-8">
    <h1 class="text-4xl font-bold text-purple-400 mb-6 font-poppins">Admin Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Manage Albums Section -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold text-purple-300 font-poppins mb-4">Manage Albums</h2>
        <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full font-semibold">
          Add New Album
        </button>
      </div>

      <!-- View Analytics Section -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold text-purple-300 font-poppins mb-4">View Analytics</h2>
        <p class="text-gray-400">Track which albums are trending.</p>
        <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full font-semibold mt-4">
          View Report
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Placeholder for future admin functionality
</script>
