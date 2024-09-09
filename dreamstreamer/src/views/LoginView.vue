<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-900">
    <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-3xl text-purple-400 font-bold mb-6">Login to DreamStreamer</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-200 mb-2" for="email">Username/Email</label>
          <input
              type="text"
              id="username"
              v-model="username"
              class="w-full p-3 rounded-lg bg-gray-700 text-white"
              required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-200 mb-2" for="password">Password</label>
          <input
              type="password"
              id="password"
              v-model="password"
              class="w-full p-3 rounded-lg bg-gray-700 text-white"
              required
          />
        </div>
        <button class="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold">
          Login
        </button>
        <p class="text-gray-400 mt-4">
          Don't have an account?
          <router-link to="/signup" class="text-purple-400 hover:text-purple-500">Sign Up</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {signIn, getCurrentUser, fetchAuthSession, fetchUserAttributes, confirmSignUp, signUp} from 'aws-amplify/auth'

const username = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  const user = await signIn({
    username: username.value,
    password: password.value,
  });

  if (user && user.nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
    console.log('New password required');
  } else if (user.nextStep.signInStep === 'CONFIRM_SIGN_UP') {
  router.push(`/confirm-signup?username=${username.value}`);
  }
  else {
    const user = getCurrentUser();
    const session = await fetchAuthSession(user);
    const userAttributes = await fetchUserAttributes(user);
    const role = userAttributes['custom:role'];
    if (role === '1') {
      router.push('/');
    } else if (role === '0') {
      router.push('/home');
    } else {
      console.log('Unauthorized User');
    }


    console.log('User:', user);
    console.log('Session:', session);
    console.log('User Attributes:', userAttributes);
    console.log(userAttributes['custom:role']);

    console.log('Sign-in Successful')
  }
};
</script>