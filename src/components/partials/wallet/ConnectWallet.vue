<script setup lang="ts">
import { Wallet } from "@injectivelabs/wallet-ts";
import Keplr from "../../assets/wallet/Keplr.vue";
import Metamask from "../../assets/wallet/Metamask.vue";
import WalletOption from "./WalletOption.vue";
import { useWalletStore } from "../../../stores/wallet";
import Header from "../../layout/Header.vue";

const walletStore = useWalletStore();

async function connectWallet(wallet: Wallet) {
  try {
    if (wallet === Wallet.Keplr) {
      await walletStore.connectKeplr();
    } else if (wallet === Wallet.Metamask) {
      await walletStore.connectMetamask();
    }
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div>
    <Header class="mb-8" />

    <h3 class="text-xl font-semibold mb-4">Connect Wallet</h3>
    <div class="border rounded-md dark:border-gray-700 p-2">
      <WalletOption
        v-bind="{
          name: 'Metamask',
          wallet: Wallet.Metamask,
          icon: Metamask,
          download: '',
        }"
        @wallet:connect="connectWallet"
      />

      <WalletOption
        v-bind="{
          name: 'Keplr',
          wallet: Wallet.Keplr,
          icon: Keplr,
          download: '',
        }"
        @wallet:connect="connectWallet"
      />
    </div>
  </div>
</template>
