<template>
  <div>
    <v-dialog
      v-model="groupDialog"
      :width="modalWidth"
    >
      <v-card>
        <v-card-title>
          <v-row
            class="flex-row"
          >
            <span
              class="mt-3 ml-5"
            >
              {{ wndTitle }}
            </span>
            <v-spacer/>
            <v-icon
              title="Закрыть"
              class="ma-3"
              @click="close"
            >
              mdi-close
            </v-icon>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-text-field
            :autofocus="true"
            maxLength="60"
            label="Название группы проектов"
            v-model="groupName"
          />
          <v-textarea
            label="Комментарий"
            v-model="groupComment"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            v-if="editingGroup"
            :disabled="!valid"
            variant="flat"
            @click="update"
          >
            Сохранить
          </v-btn>
          <v-btn
            v-else
            :disabled="!valid"
            variant="flat"
            @click="add"
          >
            Добавить
          </v-btn>
          <v-btn
            variant="flat"
            @click="close"
          >
            Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import {useDisplay} from "vuetify";

const {name} = useDisplay();
const displayMode = computed(() => name.value);
const modalWidth = computed(() => wideScreen.value ? '40%' : '100%');
const wideScreen = computed(() => ['xl', 'xxl'].includes(displayMode.value));
import {storeToRefs} from "pinia";
import {useResourceStore} from "~/store/resource.js";

const {groupDialog, editingGroup} = storeToRefs(useResourceStore());
const {addGroup, updateGroup} = useResourceStore();
const groupName = ref('');
const groupComment = ref('');
const wndTitle = computed(() => editingGroup.value ? 'Редактировать группу проектов' : 'Добавить группу проектов');
const add = async () => await addGroup({name: groupName.value, comment: groupComment.value});
const update = async () => await updateGroup({name: groupName.value, comment: groupComment.value});

const valid = computed(() => !!groupName.value);
const close = () => groupDialog.value = false;
const reset = () => {
  groupName.value = '';
  groupComment.value = '';
}
watch(groupDialog, val => !val ? reset() : checkToEdit());
const checkToEdit = () => {
  if (editingGroup.value) {
    groupName.value = editingGroup.value.name;
    groupComment.value = editingGroup.value.comment;
  }
}
</script>

<style lang="scss" scoped>

</style>
