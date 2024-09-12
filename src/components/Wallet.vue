<script setup lang="ts">
import { ref, inject } from 'vue';
import { mnemonicToSeed } from 'bip39';
import { hdkey } from 'ethereumjs-wallet';
import Web3 from 'web3';

const mnemonic = ref('');
const password = ref('');
const privateKey = inject('privateKey');

const login = async () => {
  const seed = await mnemonicToSeed(mnemonic.value);
  const wallet = hdkey.fromMasterSeed(seed);
  const keypair = wallet.derivePath("m/44'/60'/0'/0/0");
  const walletInstance = keypair.getWallet();
  const privateKeyHex = walletInstance.getPrivateKeyString();

  const web3 = new Web3();
  const account = web3.eth.accounts.privateKeyToAccount(privateKeyHex);
  const keystore = JSON.stringify(account.encrypt(password.value));

  // 保存私钥和地址到本地存储或其他地方
  localStorage.setItem('privateKey', account.privateKey);
  localStorage.setItem('address', account.address);
  localStorage.setItem('keystore', keystore);

//   privateKey.value = true;
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
      <input type="password" v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <button @click="login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      登录
    </button>
  </div>
</template>