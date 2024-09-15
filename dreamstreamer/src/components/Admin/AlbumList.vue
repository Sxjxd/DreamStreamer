<template>
  <div>
    <table class="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
      <thead>
      <tr class="bg-gray-100 text-gray-700 font-bold text-sm uppercase tracking-wide">
        <th class="py-4 px-6 text-left">Album Cover</th>
        <th class="py-4 px-6 text-left">Album Title</th>
        <th class="py-4 px-6 text-left">Artist</th>
        <th class="py-4 px-6 text-left">Genre</th>
        <th class="py-4 px-6 text-left">Year</th>
        <th class="py-4 px-6 text-center">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="album in albums" :key="album.AlbumID" class="border-b hover:bg-gray-50">
        <!-- Album Cover Column -->
        <td class="py-4 px-6">
          <img
              :src="album.CoverURL || 'default-cover.png'"
              alt="Album Cover"
              class="w-16 h-16 object-cover rounded-md border border-gray-200 shadow-sm"
          />
        </td>

        <!-- Album Title Column -->
        <td class="py-4 px-6 text-gray-900 font-medium">{{ album.Title }}</td>

        <!-- Artist Name Column -->
        <td class="py-4 px-6 text-gray-600">{{ album.ArtistName }}</td>

        <!-- Genre Column -->
        <td class="py-4 px-6 text-gray-600">{{ album.GenreName }}</td>

        <!-- Release Year Column -->
        <td class="py-4 px-6 text-gray-600">{{ album.ReleaseYear }}</td>

        <!-- Actions Column -->
        <td class="py-4 px-6 text-center flex justify-center space-x-4">
          <!-- Edit Button -->
          <button
              @click="$emit('editAlbum', album)"
              class="bg-yellow-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-150 ease-in-out focus:ring focus:ring-yellow-300"
          >
            Edit
          </button>

          <!-- Delete Button -->
          <button
              @click="$emit('deleteAlbum', album.AlbumID)"
              class="bg-red-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition duration-150 ease-in-out focus:ring focus:ring-red-300"
          >
            Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  albums: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
button:hover {
  transform: scale(1.05);
  transition: all 0.3s ease;
}
</style>
