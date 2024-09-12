<script setup lang="ts">
import { ref } from 'vue';
import { mnemonicToSeed } from 'bip39';
import { hdkey } from 'ethereumjs-wallet';

const mnemonic = ref('vanish alone rifle ranch claw fine craft color hundred flee profit oak');
const password = ref('');
const path = ref('m/44\'/60\'/0\'/0/0');
const privateKey = ref('');
const publicKey = ref('');
const address = ref('');
const checksumAddress = ref('');

const generateWallet = async () => {
  const seed = await mnemonicToSeed(mnemonic.value);
  const wallet = hdkey.fromMasterSeed(seed);
  // 打印出来看看
  
  const keypair = wallet.derivePath(path.value);
  const walletInstance = keypair.getWallet();
  
  privateKey.value = walletInstance.getPrivateKeyString();
  checksumAddress.value = walletInstance.getChecksumAddressString();
  
  publicKey.value = walletInstance.getPublicKeyString();
  address.value = walletInstance.getAddressString();
};
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">输入助记词</label>
      <input type="text" v-model="mnemonic" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">输入密码</label>
      <input type="text" v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">输入Path</label>
      <input type="text" v-model="path" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      <span class="text-gray-500 text-sm">m/44'/60'/0'/0/0</span>
    </div>
    <button @click="generateWallet" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      生成钱包
    </button>
    <div v-if="privateKey" class="mt-4">
      <div class="mb-2">
        <label class="block text-gray-700 text-sm font-bold mb-2">私钥</label>
        <p class="bg-gray-100 p-2 rounded">{{ privateKey }}</p>
      </div>
      <div class="mb-2">
        <label class="block text-gray-700 text-sm font-bold mb-2">公钥</label>
        <p class="bg-gray-100 p-2 rounded">{{ publicKey }}</p>
      </div>
      <div class="mb-2">
        <label class="block text-gray-700 text-sm font-bold mb-2">地址</label>
        <p class="bg-gray-100 p-2 rounded">{{ address }}</p>
      </div>
      <div class="mb-2">
        <label class="block text-gray-700 text-sm font-bold mb-2">校验地址</label>
        <p class="bg-gray-100 p-2 rounded">{{ checksumAddress }}</p>
      </div>
    </div>
  </div>
</template>

