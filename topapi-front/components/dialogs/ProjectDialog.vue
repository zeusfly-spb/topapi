<template>
  <div>
    <v-dialog
      v-model="projectDialog"
      :width="modalWidth"
    >
      <v-card>
        <v-card-title>
          <v-row>
            <div
              class="ml-5 mt-3 text-h6"
            >
              {{wndTitle}}
            </div>
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
            :autofocus="true"
            maxLength="60"
            label="Название проекта"
            v-model="projectName"
            @keydown.enter="action"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="blue"
            v-if="editingProject"
            :disabled="!valid"
            variant="outlined"
            @click="update"
          >
            Сохранить
          </v-btn>
          <v-btn
            v-else
            color="green"
            :disabled="!valid"
            variant="outlined"
            @click="add"
          >
            Добавить
          </v-btn>
          <v-btn
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
import {storeToRefs} from "pinia";
import {useResourceStore} from "~/store/resource.js";
import {useDisplay} from "vuetify";

const projectName = ref('');
const {projectDialog, editingProject, activeGroupId} = storeToRefs(useResourceStore());
const {addProject, updateProject} = useResourceStore();
const {mobile} = useDisplay();
const modalWidth = computed(() => mobile.value ? '100%' : '40%');
const wndTitle = computed(() => editingProject.value ? 'Редактировать проект' : 'Добавить проект');
const close = () => projectDialog.value = false;
const valid = computed(() => !!projectName.value);
const action = () => !!editingProject.value ? update() : add();
const update = async () => await updateProject({name: projectName.value});
const add = async () => await addProject({name: projectName.value, project_group_id: activeGroupId.value});
const reset = () => {
  editingProject.value = null;
  projectName.value = '';
};
const checkMode = () => {
  if (!!editingProject.value) {
    projectName.value = editingProject.value.name;
  }
};
watch(projectDialog, val => !!val ? checkMode() : reset());
</script>

<style lang="scss" scoped>

</style>
