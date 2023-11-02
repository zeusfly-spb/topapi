import { defineStore } from "pinia";
export const useMessagesStore = defineStore("messages", {
  state: () => ({
    message: '',
    color: '',
    timeout: 3000,
    active: false
  }),
  actions: {
    show({message, color="green"}) {
      this.message = message;
      this.color = color;
      this.active = true;
    }
  }
});
