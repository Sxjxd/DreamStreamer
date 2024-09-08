<template>
  <div class="mb-6">
    <h1 class="text-4xl font-bold text-gray-100">Welcome back, {{ userName }}!</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const userName = ref('User');

onMounted(() => {
  // Simulate fetching user data
  userName.value = localStorage.getItem('userName') || 'User';
});
</script>

<style scoped>
/* Additional styling if needed */
</style>
