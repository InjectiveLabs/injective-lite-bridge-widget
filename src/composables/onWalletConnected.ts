import { useEventBus } from "@vueuse/core";
import { onMounted } from "vue";
import { EventBus } from "../types";

export default function onWalletConnected(callback: Function) {
  onMounted(() => {
    callback();

    useEventBus(EventBus.WalletConnected).on(() => callback());
  });
}
