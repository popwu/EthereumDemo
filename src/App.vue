<script setup lang="ts">
import { ref, provide } from 'vue';
// 私钥
const privateKey = ref("");
provide('privateKey', privateKey);
</script>

<template>
  <router-view></router-view>
</template>


