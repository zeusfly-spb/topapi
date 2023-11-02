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
            <v-row
              class="flex-row justify-center"
            >
              <h3 class="ma-3">Вход</h3>
              <h3
                class="ma-3 inactive"
                title="Регистрировать пользователя"
                @click="goRegister"
              >
                Регистрация
              </h3>
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
          <v-card-actions
            class="text-center"
          >
            <v-spacer/>
            <v-btn
              :disabled="!validLogin"
              @click="smartLogin"
            >
              Вход
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
const { name } = useDisplay();
const displayMode = computed(() => name.value);
const modalWidth = computed(() => wideScreen.value ? '30%' : '100%');
const wideScreen = computed(() => ['xl', 'xxl'].includes(displayMode.value));
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
}
const goRegister = () => {
  loginDialog.value = false;
  registerDialog.value = true;
}
</script>

<style lang="css" scoped>

</style>
