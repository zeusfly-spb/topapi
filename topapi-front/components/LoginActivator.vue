<template>
  <v-btn
    @click="showLoginDialog"
  >
    Войти
  </v-btn>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useMainStore} from "~/store/main.js";
const {loginDialog} = storeToRefs(useMainStore());
const showLoginDialog = () => loginDialog.value = true;
</script>

<style lang="scss" scoped>

</style>
