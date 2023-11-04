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
          Вы реально хотите удалить {{itemName}} <strong>{{deletingGroup?.name || deletingProject?.name}}</strong>?
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="red"
            variant="outlined"
            @click="deleteItem"
          >
            Удалить
          </v-btn>
          <v-btn
            class="mr-3"
            variant="outlined"
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

const {mobile} = useDisplay();
const modalWidth = computed(() => mobile.value ? '100%' : '40%');
const {deleteMode, deletingGroup, deletingProject} = storeToRefs(useResourceStore());
const {deleteGroup, deleteProject} = useResourceStore();
const deleteItem = async () => {
  if (deleteMode.value === 'group') {
    await deleteGroup();
  } else if(deleteMode.value === 'project') {
    await deleteProject();
  }
}
const deleteDialog = computed({
  get() {
    return !!deleteMode.value;
  },
  set(val) {
    !val ? deleteMode.value = '' : null;
  }
});
const close = () => deleteMode.value = '';
const modes = {group: 'группу', project: 'проект', task: 'задание'};
const itemName = computed(() => modes[deleteMode.value]);
</script>

<style lang="scss" scoped>

</style>
