<template>
  <div>
    <v-dialog
      v-model="registerDialog"
      :persistent="true"
      :width="modalWidth"
    >
      <v-form
        @submit.prevent="smartRegister"
      >
        <v-card>
          <v-card-title>
            <v-row>
              <div class="ml-5 mt-3 text-h6">Регистрация</div>
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
                  :icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click="showPassword = !showPassword"
                />
              </template>
            </v-text-field>
            <v-text-field
              label="Повтор пароля"
              v-model="password_confirmation"
              type="password"
            >
              <template v-slot:append-inner>
                <v-icon
                  v-if="passwordConfirmValid"
                  color="green"
                  icon="mdi-check-bold"
                  title="Правильный повтор пароля"
                />
              </template>
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <a
              @click.prevent="goLogin"
              href="#"
              class="ml-5"
              title="Войти в систему"
            >
              Вход
            </a>
            <v-spacer/>
            <v-btn
              :disabled="!valid"
              @click="smartRegister"
            >
              Зарегистрировать
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
import {taFetch} from "~/composables/taFetch.js";
import {useMessagesStore} from "~/store/messages.js";

const {show} = useMessagesStore();
const {loginDialog, registerDialog, email, password, password_confirmation} = storeToRefs(useMainStore());
const {validEmail} = useMainStore();
const {mobile} = useDisplay();
const modalWidth = computed(() => mobile.value ? '100%' : '30%');
const showPassword = ref(false);
const isValidEmail = computed(() => validEmail(email.value));
const passwordConfirmValid = computed(() => !!password.value && password.value === password_confirmation.value);
const valid = computed(() => isValidEmail.value && !!password.value && passwordConfirmValid.value);
const close = () => registerDialog.value = false;
const goLogin = async () => {
  close();
  loginDialog.value = true;
};
const smartRegister = async () =>  {
  try {
    const {data: {_rawValue}} = await taFetch('/auth/register', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value
      }
    });
    if (_rawValue.token) {
      show({message: 'Вы успешно зарегистрировались.'});
      close();
    }
    if (_rawValue.error) {
      show({message: _rawValue.error, color: 'error'});
    }
  } catch (e) {
    show({color: 'error', message: 'Ошибка регистрации! Проверьте правильность данных'});
    console.error(e);
  }

}
</script>

<style lang="css" scoped>

</style>
