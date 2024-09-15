<template>
  <nav class="bg-white px-5 py-3 rounded-md shadow-sm w-full" aria-label="Breadcrumb">
    <ol class="list-reset flex items-center space-x-3 text-sm font-medium">
      <li v-for="(breadcrumb, index) in breadcrumbs" :key="index" class="flex items-center">
        <router-link
            v-if="breadcrumb.url"
            :to="breadcrumb.url"
            class="text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
        >
          {{ breadcrumb.name }}
        </router-link>
        <span v-else class="text-gray-500">{{ breadcrumb.name }}</span>
        <span v-if="index < breadcrumbs.length - 1" class="mx-2 text-gray-400">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
const props = defineProps({
  breadcrumbs: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
/* Custom styles for the breadcrumb */
nav {
  border-bottom: 1px solid #e5e7eb; /* Soft border to separate the breadcrumb */
}

ol {
  padding-left: 0;
}

span.text-gray-500 {
  font-weight: 600;
}

.router-link-active {
  font-weight: 700; /* Bold for active breadcrumb */
}
</style>
