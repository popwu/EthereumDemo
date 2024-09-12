<script setup lang="ts">
import { ref } from 'vue';
import Web3 from 'web3';

const web3 = new Web3('wss://sepolia.infura.io/ws/v3/323173caca9e431590d0dd8140f973d3');

const privateKey = ref('');
const address = ref('');
const balance = ref('');

const createAccount = async () => {
  try {
    const newAccount = web3.eth.accounts.create();
    privateKey.value = newAccount.privateKey;
    address.value = newAccount.address;
    const balanceWei = await web3.eth.getBalance(newAccount.address);
    balance.value = web3.utils.fromWei(balanceWei, 'ether');
  } catch (error) {
    console.error('创建账号时出错：', error);
  }
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 text-center text-blue-600">以太坊账户管理</h1>
    <button @click="createAccount" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-6">
      创建账号
    </button>
    <div v-if="address" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 class="text-xl font-semibold mb-4 text-gray-700">账号信息：</h2>
      <div class="mb-4">
        <p class="text-sm text-gray-600 mb-1"><strong>私钥：</strong></p>
        <p class="bg-gray-100 p-2 rounded break-all">{{ privateKey }}</p>
      </div>
      <div class="mb-4">
        <p class="text-sm text-gray-600 mb-1"><strong>地址：</strong></p>
        <p class="bg-gray-100 p-2 rounded">{{ address }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-600 mb-1"><strong>余额：</strong></p>
        <p class="bg-gray-100 p-2 rounded">{{ balance }} ETH</p>
      </div>
    </div>
  </div>
</template>
