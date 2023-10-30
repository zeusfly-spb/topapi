<template>
  <div>
    <v-btn
      v-if="!authorized && !loginDialog && !registerDialog"
      @click="showLoginDialog"
    >
      Войти
    </v-btn>
    <v-btn
      @click="logUserOut"
      v-else-if="authorized"
    >
      Выйти
    </v-btn>
  </div>

</template>

<script setup>
import {storeToRefs} from "pinia";
import {useMainStore} from "~/store/main.js";
const {loginDialog, registerDialog, authorized} = storeToRefs(useMainStore());
const {logUserOut} = useMainStore();
const showLoginDialog = () => loginDialog.value = true;
</script>

<style lang="scss" scoped>

</style>
