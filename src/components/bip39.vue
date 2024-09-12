<script setup lang="ts">
import { ref } from 'vue';
import * as bip39 from 'bip39';

const mnemonic = ref('');

const generateMnemonic = () => {
  mnemonic.value = bip39.generateMnemonic();
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">BIP39 助记词生成器</h1>
    
    <button 
      @click="generateMnemonic" 
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mb-6"
    >
      生成助记词
    </button>
    
    <div v-if="mnemonic" class="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">生成的助记词:</h2>
      <p class="text-gray-600 break-words">{{ mnemonic }}</p>
    </div>
  </div>
</template>