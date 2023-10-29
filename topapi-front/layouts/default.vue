<script setup>
import LoginDialog from "~/components/dialogs/LoginDialog.vue";
</script>

<template>
  <div>
    <v-app>
      <v-app-bar>
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
      <LoginDialog/>
      <v-main class="mt-2">
        <slot />
      </v-main>
    </v-app>
  </div>
</template>

<style>
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
