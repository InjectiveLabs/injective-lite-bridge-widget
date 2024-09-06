<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: "sm" | "md" | "lg";
    isWhite?: boolean;
  }>(),
  {
    size: "md",
    isWhite: false,
  }
);
</script>

<template>
  <div
    class="animate-spin rounded-full border-2 border-t-transparent"
    :class="{
      'h-4 w-4': size === 'sm',
      'h-6 w-6': size === 'md',
      'h-8 w-8': size === 'lg',
      'border-white': isWhite,
      'border-blue-500': !isWhite,
    }"
  ></div>
</template>
