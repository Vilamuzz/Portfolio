import { createApp } from "vue";
import { createPinia } from "pinia";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import App from "./App.vue";
import router from "./router";
import "./index.css";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
