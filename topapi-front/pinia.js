// pinia.ts
import { defineNuxtPlugin } from 'nuxt3';

import { createPinia } from 'pinia';

export default defineNuxtPlugin((app) => {
  const pinia = createPinia();
  app.use(pinia);
});
