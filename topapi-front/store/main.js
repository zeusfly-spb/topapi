import { defineStore } from "pinia";
export const useMainStore = defineStore("main", {
  state: () => ({
    loginDialog: false,
    email: '',
    password: ''
  }),
  actions: {
  }
});
