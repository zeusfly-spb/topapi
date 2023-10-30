<template>
  <div
    id="app"
    class="unselectable"
  >
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import {useMainStore} from "~/store/main.js";

const { user, autostart, authorized } = storeToRefs(useMainStore());
const token = computed(() => {
  const tokenCookie = useCookie("top_api_token");
  return tokenCookie.value || null;
});
const config = useRuntimeConfig();
watchEffect(async () => {
  if (token.value && !authorized.value && autostart.value) {
    console.log('Auto authenticate');
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    headers.set("Authorization", `Bearer ${token.value}`);
    const detailsPath = config.public.apiBase + "/details";
    const {
      data: { _rawValue },
    } = await useFetch(detailsPath, { method: "GET", headers });
    user.value = _rawValue;
  }

});
</script>
