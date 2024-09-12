<template>
  <div class="flex">
    <nav class="w-64 bg-gray-800 min-h-screen">
      <ul class="py-4">
        <li v-for="route in routes" :key="route.path">
          <router-link :to="route.path" class="block px-4 py-2 text-white hover:bg-gray-700">
            {{ route.name }}
          </router-link>
        </li>
      </ul>
    </nav>
    <main class="flex-1 p-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const routes = ref([
  { path: '/', name: '首页' },
  { path: '/account', name: '账号' },
  { path: '/bip39', name: 'bip39' },
  { path: '/ethwallet', name: 'ETH钱包' },
  { path: '/keystore', name: 'Keystore' },
  { path: '/hello', name: 'HelloWorld' },
  { path: '/about', name: '关于' },
  { path: '/contact', name: '联系我们' },
])
</script>
