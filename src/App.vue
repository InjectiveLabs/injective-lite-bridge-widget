<script setup lang="ts">
import { ref } from "vue";

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
      <h1 class="text-xl font-thin text-zinc-300 mb-4">Injective Peggy</h1>

      <div
        class="grid grid-cols-2 gap-2 p-1 border dark:border-zinc-700 rounded-lg"
      >
        <button
          v-for="value in ['deposit', 'withdraw']"
          class="px-2 py-2 text-sm font-semibold w-full rounded capitalize"
          @click="selectedView = value"
          :class="{
            'bg-blue-400 text-black': selectedView === value,
          }"
        >
          {{ value }}
        </button>
      </div>
    </div>
  </div>
</template>
