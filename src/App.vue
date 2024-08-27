<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <div class="inj-app">
    <div class="max-w-[370px] w-full mx-auto bg-red-500">
      <div class="bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
        <h1 class="text-3xl font-bold">Hello World</h1>
        <button
          class="bg-blue-500 text-white p-2 rounded-md"
          @click="count++"
        >
          Count: {{ count }}
        </button>
      </div>
    </div>
  </div>
</template>
