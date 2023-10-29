<template>
  <div>
    <v-dialog
      v-model="loginDialog"
      :persistent="true"
      :width="modalWidth"
    >
      <v-card>
        <v-card-title>
          <v-row
            class="flex-row"
          >
            <h3 class="mt-3 ml-3">Авторизация</h3>
            <v-spacer/>
            <v-icon
              title="Закрыть"
              class="ma-3 close"
              @click="close"
            >
              mdi-close
            </v-icon>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Email"
            v-model="email"
          />
          <v-text-field
            label="Пароль"
            v-model="password"
          />
        </v-card-text>
        <v-card-actions
          class="text-center"
        >
          <v-btn
            @click=""
          >
            Забыли пароль?
          </v-btn>
          <v-spacer/>
          <v-btn
            class="ma-3"
            @click="login"
          >
            Войти
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import {useMainStore} from "~/store/main.js";
import {storeToRefs} from "pinia";
import {useDisplay} from "vuetify";

const {loginDialog, email, password} = storeToRefs(useMainStore());
const { name } = useDisplay();
const displayMode = computed(() => name.value);
const modalWidth = computed(() => wideScreen.value ? '30%' : '100%');
const wideScreen = computed(() => ['xl', 'xxl'].includes(displayMode.value));
const close = () => loginDialog.value = false;
const login = async () => {

};
</script>

<style lang="css" scoped>

</style>
