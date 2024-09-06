<script setup lang="ts">
import { useWalletStore } from "./stores/wallet";
import ConnectWallet from "./components/partials/wallet/ConnectWallet.vue";

import { Status, StatusType } from "@injectivelabs/utils";
import Transfer from "./components/partials/transfer/Transfer.vue";
import onWalletConnected from "./composables/onWalletConnected";
import { useAccountStore } from "./stores/account";
import { reactive } from "vue";
import { useTokenStore } from "./stores/token";

withDefaults(
  defineProps<{
    onInit?: (props: any) => void;
    onSuccess?: (props: any) => void;

    user: {
      injAddress: "inj1...";
      wallet: "Metamask";
    };
  }>(),
  {
    onInit: () => {},
    onSuccess: () => {},
  }
);

const tokenStore = useTokenStore();
const walletStore = useWalletStore();
const accountStore = useAccountStore();

const status = reactive(new Status(StatusType.Idle));

const addBgClasses = false;

onWalletConnected(() => {
  status.setLoading();
  Promise.all([
    accountStore.fetchBalanceAndAllowance(),
    tokenStore.fetchTokenUsdPriceMap(
      tokenStore.tokens.map(({ coinGeckoId }) => coinGeckoId)
    ),
  ])
    .then(() => {
      status.setIdle();
    })
    .catch(() => {
      status.setError();
    });
});
</script>

<template>
  <div class="inj-app">
    <div
      class="text-black dark:text-white p-4"
      :class="{
        'bg-zinc-100 dark:bg-zinc-900': addBgClasses,
      }"
    >
      <ConnectWallet v-if="!walletStore.isUserConnected" />

      <Transfer
        v-bind="{ walletStatus: status }"
        v-else
      />
    </div>
  </div>
</template>
