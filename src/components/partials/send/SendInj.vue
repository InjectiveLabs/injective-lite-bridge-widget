<script setup lang="ts">
import { ref } from "vue";
import { useWalletStore } from "../../../stores/wallet";
import { MsgSend } from "@injectivelabs/sdk-ts";
import { getExplorerUrl } from "../../../utils";

const recipient = ref("inj1mxk6k8mqff0hlxn8t5tq7a2x82ckv493fja5r4");
const txHash = ref("");
const loading = ref(false);

const walletStore = useWalletStore();

async function send() {
  const msg = MsgSend.fromJSON({
    amount: {
      amount: "1",
      denom: "inj",
    },
    srcInjectiveAddress: walletStore.injectiveAddress,
    dstInjectiveAddress: recipient.value,
  });

  try {
    loading.value = true;
    const result = await walletStore.broadcastMessages([msg]);

    txHash.value = result?.txHash || "success";
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <input
      v-model="recipient"
      type="text"
      placeholder="Recipient"
      class="dark:bg-zinc-900 dark:text-white border block w-full p-2 rounded-md"
    />
    <button
      class="bg-blue-500 text-white p-2 rounded-md block w-full mt-4"
      @click="send"
    >
      {{ loading ? "Loading..." : "Send" }}
    </button>

    <a
      :href="getExplorerUrl() + '/transaction/' + txHash"
      target="_blank"
      class="block mt-4"
      v-if="txHash"
    >
      <p>View on Explorer</p>
      <p>{{ `${txHash.slice(0, 4)}...${txHash.slice(-4)}` }}</p>
    </a>
  </div>
</template>
