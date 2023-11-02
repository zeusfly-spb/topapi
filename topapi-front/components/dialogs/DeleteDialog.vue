<template>
  <div>
    <v-dialog
      v-model="deleteDialog"
      :width="modalWidth"
    >
      <v-card>
        <v-card-title>
          <v-row>
            <span
              class="mt-3 ml-5"
            >
              Удалить {{itemName}}
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
          Вы реально хотите удалить {{itemName}} <strong>{{deletingGroup?.name}}</strong>?
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            variant="flat"
            @click="deleteItem"
          >
            Удалить
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
import {storeToRefs} from "pinia";
import {useResourceStore} from "~/store/resource.js";

const {name} = useDisplay();
const displayMode = computed(() => name.value);
const modalWidth = computed(() => wideScreen.value ? '30%' : '100%');
const wideScreen = computed(() => ['xl', 'xxl'].includes(displayMode.value));
const {deleteDialog, deleteMode, deletingGroup} = storeToRefs(useResourceStore());
const {deleteGroup} = useResourceStore();
const deleteItem = async () => await deleteGroup();
const close = () => deleteMode.value = '';
const modes = {group: 'группу', project: 'проект', task: 'задание'};
const itemName = computed(() => modes[deleteMode.value]);
</script>

<style lang="scss" scoped>

</style>
