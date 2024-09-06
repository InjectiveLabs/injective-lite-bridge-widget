<script setup lang="ts">
import Spinner from "./Spinner.vue";

withDefaults(
  defineProps<{
    isLoading: boolean;
  }>(),
  {
    isLoading: false,
  }
);
</script>

<template>
  <button
    class="bg-blue-500 text-white px-4 py-3 rounded-md flex justify-center space-x-2"
  >
    <Spinner
      size="sm"
      isWhite
      v-if="isLoading"
    />
    <slot />
  </button>
</template>
