<script setup lang="ts">
import {
  BigNumberInWei,
  formatWalletAddress,
  Status,
  StatusType,
} from "@injectivelabs/utils";
import { useAccountStore } from "../../../stores/account";
import Spinner from "../../common/Spinner.vue";
import Money from "../../assets/icon/Money.vue";
import CurrencyInput from "../../common/CurrencyInput.vue";
import Button from "../../common/Button.vue"; // Import the new Button component
import { usdtToken } from "../../../app/data/tokens";
import { useWalletStore } from "../../../stores/wallet";
import { computed, reactive, ref } from "vue";

const walletStore = useWalletStore();
const accountStore = useAccountStore();

withDefaults(
  defineProps<{
    walletStatus: Status;
  }>(),
  {}
);

const status = reactive(new Status(StatusType.Idle));
const amount = ref("");

const availableBalance = computed(() => {
  return new BigNumberInWei(
    accountStore.denomBalanceMap[usdtToken.denom].balance
  )
    .toBase(usdtToken.decimals)
    .toFixed();
});

async function onConfirm() {
  status.setLoading();

  await new Promise((resolve) => setTimeout(resolve, 2000));

  status.setIdle();
}
</script>

<template>
  <div
    v-if="walletStatus.isLoading()"
    class="flex justify-center items-center my-20"
  >
    <Spinner size="lg" />
  </div>

  <div v-else>
    <div class="flex justify-center mb-4">
      <Money />
    </div>

    <div class="text-center mb-8">
      <h3 class="font-semibold text-xl">Transfer USDT to Helix</h3>
      <p class="text-sm mt-4">
        It looks like you have some USDT on Ethereum. You can transfer it to
        Helix with just one click!
      </p>
    </div>

    <CurrencyInput
      @max="amount = availableBalance"
      v-model="amount"
      :denom="usdtToken.denom"
      :available="availableBalance"
    />

    <div class="mt-2">
      <p class="text-sm text-gray-500">
        Address: {{ formatWalletAddress(walletStore.address) }}
      </p>
    </div>

    <div class="mt-8">
      <Button
        @click="onConfirm"
        class="w-full flex justify-center items-center space-x-2"
        :isLoading="status.isLoading()"
      >
        <span>Confirm</span>
      </Button>
    </div>
  </div>
</template>
