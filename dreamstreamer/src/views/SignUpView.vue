<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-900">
    <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-3xl text-purple-400 font-bold mb-6">Sign Up for DreamStreamer</h2>
      <form @submit.prevent="signup">
        <div class="mb-4">
          <label class="block text-gray-200 mb-2" for="username">Username</label>
          <input
              type="text"
              id="username"
              v-model="username"
              class="w-full p-3 rounded-lg bg-gray-700 text-white"
              required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-200 mb-2" for="email">Email</label>
          <input
              type="email"
              id="email"
              v-model="email"
              class="w-full p-3 rounded-lg bg-gray-700 text-white"
              required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-200 mb-2" for="password">Password</label>
          <input
              type="password"
              id="password"
              v-model="password"
              class="w-full p-3 rounded-lg bg-gray-700 text-white"
              required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-200 mb-2" for="confirm-password">Confirm Password</label>
          <input
              type="password"
              id="confirm-password"
              v-model="confirmPassword"
              class="w-full p-3 rounded-lg bg-gray-700 text-white"
              required
          />
        </div>
        <button
            :disabled="isLoading"
            class="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
        >
          Sign Up
        </button>
        <p v-if="errorMsg" class="text-red-500 text-sm mt-2">{{ errorMsg }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signUp } from 'aws-amplify/auth';

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const errorMsg = ref('');
const router = useRouter();

const signup = async () => {
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match!';
    return;
  }
  isLoading.value = true;
  try {
    await signUp({
      username: username.value,  // Username should not be an email format
      password: password.value,
      options: {
        userAttributes: {
          email: email.value,
          name: username.value,
          'custom:role': '0',
        },
      },
    });
    alert('Registration successful. Please verify your email address.');
    router.push('/login');
  } catch (error) {
    console.error('Error signing up:', error);
    errorMsg.value = error.message;
  } finally {
    isLoading.value = false;
  }
};
</script>
