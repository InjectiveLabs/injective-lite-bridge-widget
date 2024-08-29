<script setup lang="ts">
import { useWalletStore } from "./stores/wallet";
import Header from "./components/layout/Header.vue";
import ConnectWallet from "./components/partials/wallet/ConnectWallet.vue";
import SendInj from "./components/partials/send/SendInj.vue";
import { formatWalletAddress } from "@injectivelabs/utils";

const props = withDefaults(
  defineProps<{
    onInit: (props: any) => void;
    onSuccess: (props: any) => void;

    user: {
      injAddress: "inj1...";
      wallet: "Metamask";
    };
  }>(),
  {}
);

const walletStore = useWalletStore();

const addBgClasses = false;
</script>

<template>
  <div class="inj-app">
    <div
      class="text-black dark:text-white p-4"
      :class="{
        'bg-zinc-100 dark:bg-zinc-900': addBgClasses,
      }"
    >
      <Header class="mb-8" />

      <ConnectWallet v-if="!walletStore.isUserConnected" />

      <SendInj v-else />

      <div
        v-if="walletStore.isUserConnected"
        class="my-8 border-t"
      >
        <p>Address:</p>
        <p>{{ formatWalletAddress(walletStore.injectiveAddress) }}</p>
      </div>
    </div>
  </div>
</template>
