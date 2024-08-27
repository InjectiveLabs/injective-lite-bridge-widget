<script setup lang="ts">
import { ref } from "vue";
import InjectiveLogo from "./components/assets/injectiveLogo.vue";

const selectedView = ref("deposit");
const addBgClasses = false;
</script>

<template>
  <div class="inj-app">
    <div
      class="text-black dark:text-white p-6"
      :class="{
        'bg-zinc-100 dark:bg-zinc-900': addBgClasses,
      }"
    >
      <InjectiveLogo class="h-10 mx-auto" />
      <p class="text-center font-light text-sm -mt-2 text-gray-400 mb-6">
        Peggy Bridge
      </p>

      <div
        class="grid grid-cols-2 p-1 border border-zinc-300 dark:border-zinc-700 rounded-lg"
      >
        <button
          v-for="value in ['deposit', 'withdraw']"
          class="px-2 py-2 text-sm font-semibold w-full rounded capitalize"
          @click="selectedView = value"
          :class="{
            'bg-blue-200 dark:bg-blue-400 text-black': selectedView === value,
          }"
        >
          {{ value }}
        </button>
      </div>
    </div>
  </div>
</template>
