<script setup>
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
<!--        <MainMenu v-if="authenticated" />-->
        <template >
          <v-btn @click="authDialog = true"> Войти </v-btn>
        </template>
      </v-app-bar>
      <v-main class="mt-2">
        <slot />
      </v-main>
    </v-app>
  </div>
</template>

<style scoped></style>
