import { useMainStore } from "~/store/main";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware((to, from) => {
  const { authorized, loginDialog } = storeToRefs(useMainStore());
  const tokenCookie = useCookie("top_api_token");
  if (!authorized.value && !tokenCookie.value) {
    loginDialog.value = true;
    return navigateTo("/");
  }
});
