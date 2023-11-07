<template>
  <td
    class="actions"
  >
    <v-icon
      class="touchable"
      :color="projectStatus ? 'orange' : 'green'"
      :icon="buttonIcon"
      :title="`${buttonTitle} ${projectName}`"
      @click="switchActivity"
    />
    <v-icon
      color="blue"
      icon="mdi-file-edit"
      class="touchable"
      :title="`Редактировать проект ${projectName}`"
      @click="editProject"
    />
    <v-icon
      color="red"
      icon="mdi-delete-forever"
      class="touchable"
      :title="`Удалить проект ${projectName}`"
      @click="deleteProject"
    />
  </td>
</template>

<script setup>
import {useResourceStore} from "~/store/resource.js";

const {moveProjectToDelete, moveProjectToEdit, startProject, pauseProject} = useResourceStore();
const props = defineProps({
  project: {
    type: Object,
    required: true,
  }
});
const project = toRef(props, 'project');
const projectStatus = computed(() => project.value.active)
const projectId = computed(() => project.value?.id);
const projectName = computed(() => project.value?.name);
const buttonIcon = computed(() => projectStatus.value ? 'mdi-pause' : 'mdi-play');
const buttonTitle = computed(() => projectStatus.value ? 'Остановить' : 'Запустить');
const deleteProject = () => moveProjectToDelete(projectId.value);
const editProject = () => moveProjectToEdit(projectId.value);
const switchActivity = () => projectStatus.value ? pauseProject(project.value.id) : startProject(project.value.id);
</script>

<style lang="css" scoped>
.actions {
  text-align: right;
}
</style>
