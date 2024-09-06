<script setup lang="ts">
import { computed } from "vue";
import { useTokenStore } from "../../stores/token";
import { formatCurrency } from "../../utils";

const tokenStore = useTokenStore();

const props = withDefaults(
  defineProps<{
    denom?: string;
    available?: string;
    modelValue: string;
  }>(),
  {
    denom: "inj",
    available: "0",
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  max: [value: string];
}>();

const id = Math.random().toString(36).substring(2, 15);

const amount = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const token = computed(() => {
  return tokenStore.tokens.find((token) => token.denom === props.denom);
});

const available = computed(() => {
  return formatCurrency(props.available);
});

function onMax() {
  emit("max", props.available);
  document.getElementById(id)?.focus();
}
</script>

<template>
  <label
    v-if="token"
    :for="id"
    class="border rounded-md p-2 border-gray-300 dark:border-gray-700 block"
  >
    <div class="flex justify-between mb-2 p-1">
      <p class="text-xs flex-1 text-gray-500 dark:text-gray-500">Amount</p>
      <div class="flex items-center gap-2">
        <p class="text-xs text-blue-500">Available: {{ available }}</p>
        <button
          class="text-xs text-blue-500 bg-blue-500/10 px-1 rounded font-light hover:bg-blue-500/20 none"
          @click="onMax"
        >
          MAX
        </button>
      </div>
    </div>

    <div class="flex">
      <input
        :id="id"
        v-model="amount"
        type="text"
        class="flex-1 bg-transparent min-w-0 focus:outline-none p-1"
        placeholder="0.00"
      />
      <div class="p-1 flex justify-center items-center gap-2">
        <img
          :src="token.logo"
          :alt="token.name"
          class="size-6 border border-gray-300 dark:border-gray-700 bg-gray-300 dark:bg-gray-700 rounded-full p-0.5"
        />
        <p class="text-xl font-semibold">
          {{ token.symbol }}
        </p>
      </div>
    </div>
  </label>
</template>
