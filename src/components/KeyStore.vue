<script setup lang="ts">
import { ref } from 'vue';
import { mnemonicToSeed } from 'bip39';
import { hdkey } from 'ethereumjs-wallet';
import Web3 from 'web3';

const privateKey = ref('');
const mnemonic = ref('');
const password = ref('');
const keystoreFromPrivateKey = ref('');
const keystoreFromMnemonic = ref('');
const privateKeyFromPrivateKey = ref('');
const addressFromPrivateKey = ref('');
const privateKeyFromMnemonic = ref('');
const addressFromMnemonic = ref('');

const generateKeystoreFromPrivateKey = async () => {
  const web3 = new Web3();
  const account = web3.eth.accounts.privateKeyToAccount(privateKey.value);
  const keystore = account.encrypt(password.value);
  keystoreFromPrivateKey.value = JSON.stringify(keystore);
  privateKeyFromPrivateKey.value = account.privateKey;
  addressFromPrivateKey.value = account.address;
};

const generateKeystoreFromMnemonic = async () => {
  const seed = await mnemonicToSeed(mnemonic.value);
  const wallet = hdkey.fromMasterSeed(seed);
  const keypair = wallet.derivePath("m/44'/60'/0'/0/0");
  const walletInstance = keypair.getWallet();
  const privateKeyHex = walletInstance.getPrivateKeyString();

  const web3 = new Web3();
  const account = web3.eth.accounts.privateKeyToAccount(privateKeyHex);
  const keystore = await account.encrypt(password.value);
//   const keystore2 = await walletInstance.toV3(password.value);
//   console.log(keystore2);
  keystoreFromMnemonic.value = JSON.stringify(keystore);
  privateKeyFromMnemonic.value = account.privateKey;
  addressFromMnemonic.value = account.address;
};
</script>

<template>
  <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">输入私钥</label>
      <input type="text" v-model="privateKey" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">输入密码</label>
      <input type="password" v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <button @click="generateKeystoreFromPrivateKey" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      通过私钥生成 Keystore
    </button>
    <div v-if="keystoreFromPrivateKey" class="mt-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">生成的 Keystore</label>
      <p class="bg-gray-100 p-2 rounded overflow-auto max-h-32">{{ keystoreFromPrivateKey }}</p>
      <label class="block text-gray-700 text-sm font-bold mb-2">私钥</label>
      <p class="bg-gray-100 p-2 rounded">{{ privateKeyFromPrivateKey }}</p>
      <label class="block text-gray-700 text-sm font-bold mb-2">地址</label>
      <p class="bg-gray-100 p-2 rounded">{{ addressFromPrivateKey }}</p>
    </div>

    <div class="mt-8 mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">输入助记词</label>
      <input type="text" v-model="mnemonic" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <button @click="generateKeystoreFromMnemonic" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      通过助记词生成 Keystore
    </button>
    <div v-if="keystoreFromMnemonic" class="mt-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">生成的 Keystore</label>
      <p class="bg-gray-100 p-2 rounded overflow-auto max-h-32">{{ keystoreFromMnemonic }}</p>
      <label class="block text-gray-700 text-sm font-bold mb-2">私钥</label>
      <p class="bg-gray-100 p-2 rounded">{{ privateKeyFromMnemonic }}</p>
      <label class="block text-gray-700 text-sm font-bold mb-2">地址</label>
      <p class="bg-gray-100 p-2 rounded">{{ addressFromMnemonic }}</p>
    </div>
  </div>
</template>

<style scoped>
/* 你可以在这里添加额外的样式 */
</style>