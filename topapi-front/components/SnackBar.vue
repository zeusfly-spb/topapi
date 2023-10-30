<template>
  <div>
    <v-snackbar
      location="top right"
      v-model="active"
      :timeout="timeout"
      :color="color"
    >
      {{ message }}
    </v-snackbar>
  </div>
</template>

<script setup>
import {useMessagesStore} from "~/store/messages.js";

const {timeout, color, message, active} = storeToRefs(useMessagesStore());
</script>

<style lang="css" scoped>

</style>
