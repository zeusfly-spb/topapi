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
            <v-row
              class="flex-row"
            >
              <h3 class="mt-3 ml-3">Регистрация</h3>
              <h3
                class="ma-3 inactive"
                title="Регистрировать пользователя"
                @click="goLogin"
              >
                Вход
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
const { name } = useDisplay();
const displayMode = computed(() => name.value);
const modalWidth = computed(() => wideScreen.value ? '30%' : '100%');
const wideScreen = computed(() => ['xl', 'xxl'].includes(displayMode.value));
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
