<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-900">
    <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-3xl text-purple-400 font-bold mb-6">Confirm Your Email</h2>
      <p class="text-gray-400 mb-4">Please enter the confirmation code sent to your email:</p>
      <form @submit.prevent="confirmSignup">
        <div class="mb-4">
          <label class="block text-gray-200 mb-2" for="confirmation-code">Confirmation Code</label>
          <input
              type="text"
              id="confirmation-code"
              v-model="confirmationCode"
              class="w-full p-3 rounded-lg bg-gray-700 text-white"
              placeholder="Enter your confirmation code"
              required
          />
        </div>
        <button class="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold">
          Confirm Sign Up
        </button>
      </form>
      <p class="text-gray-400 mt-4">
        Didn't receive a code?
        <a @click="resendCode" class="text-purple-400 hover:text-purple-500 cursor-pointer">Resend Code</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { confirmSignUp, resendSignUpCode, fetchUserAttributes } from 'aws-amplify/auth';

const confirmationCode = ref('');
const router = useRouter();
const route = useRoute();

const confirmSignup = async () => {
  try {
    console.log('username',route.query.username);
    await confirmSignUp({ username: route.query.username, confirmationCode: confirmationCode.value});
    const userAttributes = await fetchUserAttributes(user);
    const role = userAttributes['custom:role'];
    if (role === '1') {
      router.push('/');
    } else if (role === '0') {
      router.push('/home');
    } else {
      console.log('Unauthorized User');
    }
  } catch (error) {
    console.error('Error confirming sign up:', error);
  }
};

const resendCode = async () => {
  try {
    await resendSignUpCode({username: route.query.username});
    console.log('Code resent successfully');
  } catch (error) {
    console.error('Error resending code:', error);
  }
};

</script>
