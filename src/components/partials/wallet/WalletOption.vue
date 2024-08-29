<script setup lang="ts">
import type { Component } from "vue";
import Download from "../../assets/icon/Download.vue";
import { Wallet } from "@injectivelabs/wallet-ts";

const props = withDefaults(
  defineProps<{
    icon: Component;
    name: string;
    wallet: Wallet;
    download?: string;
  }>(),
  {
    download: "",
  }
);

const emit = defineEmits<{
  "wallet:connect": [Wallet];
}>();

const handleConnect = () => {
  emit("wallet:connect", props.wallet);
};
</script>

<template>
  <button
    @click="handleConnect"
    class="flex w-full items-center space-x-2 p-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md"
  >
    <component
      :is="icon"
      class="size-6"
    />
    <p class="text-lg flex-1 text-start">{{ name }}</p>
    <Download
      class="size-5 opacity-50"
      v-if="download"
    />
  </button>
</template>
