<template>
  <header class="bg-gray-900 text-gray-200 flex justify-between items-center p-4">
    <!-- Logo -->
    <div class="flex items-center">
      <router-link to="/home">
      <img src="@/assets/logo.png" alt="DreamStreamer Logo" class="h-10 w-auto" />
      </router-link>
    </div>

    <!-- Desktop Navigation Links (visible on md and larger screens) -->
    <nav class="hidden md:flex space-x-6">
      <router-link to="/home" class="nav-link">Home</router-link>
      <router-link to="/browse" class="nav-link">Browse</router-link>
      <router-link to="/library" class="nav-link">Library</router-link>
    </nav>
    <!-- Login/Signup Buttons (visible on md and larger screens) -->
    <div class="hidden md:flex space-x-4">
      <router-link to="/login" class="btn-link">Login</router-link>
      <router-link to="/signup" class="btn-link bg-purple-600 hover:bg-purple-700">Sign Up</router-link>
    </div>

    <!-- Mobile Menu Button (hamburger icon) - visible on small screens -->
    <button @click="toggleMenu" class="block md:hidden text-gray-300 hover:bg-gray-700 p-2 rounded focus:outline-none">
      <font-awesome-icon :icon="isMenuOpen ? 'times' : 'bars'" class="text-2xl" />
    </button>

    <!-- Mobile Navigation Menu (shown when isMenuOpen is true) -->
    <div v-if="isMenuOpen" class="absolute top-16 left-0 w-full bg-gray-900 p-6 md:hidden z-50">
      <nav class="flex flex-col space-y-4">
        <router-link to="/home" class="nav-link" @click="toggleMenu">Home</router-link>
        <router-link to="/browse" class="nav-link" @click="toggleMenu">Browse</router-link>
        <router-link to="/library" class="nav-link" @click="toggleMenu">Library</router-link>
        <router-link to="/login" class="btn-link" @click="toggleMenu">Login</router-link>
        <router-link to="/signup" class="btn-link bg-purple-600 hover:bg-purple-700" @click="toggleMenu">Sign Up</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
/* Style for navigation links */
.nav-link {
  padding: 10px 14px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border-radius: 4px;
  color: #d1d5db; /* Tailwind's text-gray-300 */
}

.nav-link:hover {
  background-color: #4b5563; /* Tailwind's bg-gray-700 */
  color: white;
  transform: scale(1.05);
}

/* Style for buttons like Login/Sign Up */
.btn-link {
  padding: 10px 14px;
  background-color: #4b5563; /* Tailwind's bg-gray-700 */
  color: white;
  border-radius: 4px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-link:hover {
  background-color: #374151; /* Tailwind's bg-gray-800 */
  transform: scale(1.05);
}

/* Additional styling for the mobile menu button and transitions */
button {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:focus {
  outline: none;
  transform: scale(1.05);
}

/* Z-index to make sure the mobile menu appears above other content */
.z-50 {
  z-index: 50;
}

button:hover {
  background-color: #4b5563;
}
</style>
