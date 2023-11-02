import { defineStore } from "pinia";
import {taFetch} from "~/composables/taFetch.js";
export const useMainStore = defineStore("main", {
  state: () => ({
    user: null,
    token: '',
    loginDialog: false,
    registerDialog: false,
    email: '',
    password: '',
    password_confirmation: '',
    autostart: true
  }),
  actions: {
    async logUserOut() {
      this.autostart = false;
      const token_cookie = useCookie("top_api_token");
      token_cookie.value = null;
      this.user = null;
      this.token = null;
      await navigateTo("/");
    },
  },
  getters: {
    userEmail: state => state?.user?.email || 'undefined',
    authorized: state => !!state.user,
    validEmail: state => example => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(example);
    }
  }
});
