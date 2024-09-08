<template>
  <div id="app" class="flex flex-col h-screen bg-black text-gray-200">
    <!-- Top Navigation Bar -->
    <TopNav />

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-y-auto p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import TopNav from './components/TopNav.vue';

export default {
  name: 'App',
  components: {
    TopNav,
  },
};
</script>

<style>
/* Global styles for the layout */
html, body, #app {
  height: 100%;
  margin: 0;
}

body {
  overflow: hidden;
}
</style>
