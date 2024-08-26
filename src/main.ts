import { createApp } from "vue";
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
  app.mount(selector);

  return app;
}

export { mountWidget };
globalThis.InjBridgeWidget = { mountWidget };

if (import.meta.env.MODE === "development") {
  createApp(App).mount("#app");
}
