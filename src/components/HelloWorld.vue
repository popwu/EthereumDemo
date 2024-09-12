<script setup lang="ts">
import { ref } from 'vue'



const count = ref(0)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

const reset = () => {
  count.value = 0
}
</script>

<template>

  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md">
      <h1 class="text-3xl font-bold underline mb-4">
        Hello World!
      </h1>
      
    

  <div class="card">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" @click="increment">
      加
    </button>
    <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2" @click="reset">
      重置
    </button>
    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="decrement">
      减
    </button>
    <p class="mt-4 text-2xl font-semibold text-gray-700">count is {{ count }}</p>
  </div>

  </div>
  </div>
</template>
