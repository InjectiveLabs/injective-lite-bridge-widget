import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";

declare global {
  interface Window {
    InjBridgeWidget: { mountWidget: typeof mountWidget };
  }
  var InjBridgeWidget: { mountWidget: typeof mountWidget };
}

function mountWidget(selector: string, props: any) {
  const app = createApp(App, props);
  const pinia = createPinia();

  app.use(pinia);
  app.mount(selector);

  return app;
}

export { mountWidget };
globalThis.InjBridgeWidget = { mountWidget };

if (import.meta.env.MODE === "development") {
  mountWidget("#app", {
    onInit: (props: any) => {
      console.log("onInit", props);
    },

    user: {
      injAddress: "inj1...",
      wallet: "Metamask",
    },
  });
}
