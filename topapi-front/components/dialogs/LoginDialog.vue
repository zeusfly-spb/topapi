<template>
  <div>
    <v-dialog
      v-model="loginDialog"
      :persistent="true"
      :width="modalWidth"
    >
      <v-form
        @submit.prevent="smartLogin"
      >
        <v-card>
          <v-card-title>
            <v-row>
              <div class="ml-5 mt-3 text-h6">Вход</div>
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
              :type="showPassword ? 'text' : 'password'"
            >
              <template v-slot:append-inner>
                <v-icon
                  :title="`${showPassword ? 'Скрыть' : 'Показать'} пароль`"
                  :icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click="showPassword = !showPassword"
                />
              </template>
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <a
              @click.prevent="goRegister"
              href="#"
              class="ml-5"
              title="Регистрироваться в системе"
            >
              Регистрация
            </a>
            <v-spacer/>
            <v-btn
              class="ma-3"
              :disabled="!validLogin"
              @click="smartLogin"
            >
              Войти
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script setup>
import {useMainStore} from "~/store/main.js";
import {storeToRefs} from "pinia";
import {useDisplay} from "vuetify";

const {loginDialog, registerDialog, email, password, user} = storeToRefs(useMainStore());
const {login} = useMainStore();
import {useMessagesStore} from "~/store/messages.js";
import {taFetch} from "~/composables/taFetch.js";

const {show} = useMessagesStore();
const showPassword = ref(false);
const {mobile} = useDisplay();
const modalWidth = computed(() => mobile.value ? '100%' : '30%');
const validLogin = computed(() => !!email.value && !!password.value);
const close = () => loginDialog.value = false;
const smartLogin = async () => {
  try {
    const {data: {_rawValue}} = await taFetch('/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    });
    if (_rawValue.user) {
      user.value = _rawValue.user;
    }
    if (_rawValue.token) {
      const token_cookie = useCookie("top_api_token");
      token_cookie.value = _rawValue.token;
    }
    loginDialog.value = false;
    await navigateTo('/home');
    show({message: 'Вы успешно авторизовались в системе'});
  } catch (e) {
    show({message: 'Ошибка авторизации! Проверьте правильность данных', color: 'error'});
    console.error(e);
  }
};
const goRegister = () => {
  loginDialog.value = false;
  registerDialog.value = true;
}
</script>

<style lang="css" scoped>

</style>
