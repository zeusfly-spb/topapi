<script setup>
import LoginDialog from "~/components/dialogs/LoginDialog.vue";
import RegisterDialog from "~/components/dialogs/RegisterDialog.vue";
import GroupDialog from "~/components/dialogs/GroupDialog.vue";
import DeleteDialog from "~/components/dialogs/DeleteDialog.vue";
import ProjectDialog from "~/components/dialogs/ProjectDialog.vue";
import {useMainStore} from "~/store/main.js";
const { user, autostart, authorized } = storeToRefs(useMainStore());
const token = computed(() => {
  const tokenCookie = useCookie("top_api_token");
  return tokenCookie.value || null;
});
const config = useRuntimeConfig();
watchEffect(async () => {
  if (token.value && !authorized.value && autostart.value) {
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

<template>
  <div>
    <v-app>
      <v-app-bar
        density="compact"
      >
        <span
          class="ml-5 unselectable"
          style="cursor: pointer"
          title="На главную"
          @click="navigateTo('/')"
        >
          TopApi
        </span>
        <v-spacer />
        <LoginActivator/>
     </v-app-bar>
      <SnackBar/>
      <LoginDialog/>
      <RegisterDialog/>
      <GroupDialog/>
      <ProjectDialog/>
      <DeleteDialog/>
      <v-main class="mt-2">
        <slot />
      </v-main>
    </v-app>
  </div>
</template>

<style>
.inactive {
  color: #6200EE;
  opacity: .6;
  cursor: pointer;
}
.inactive:hover {
  opacity: 1;
}
a {
  text-decoration: none;
}
.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
