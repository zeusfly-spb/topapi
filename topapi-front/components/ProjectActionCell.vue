<template>
  <td
    style="text-align: right"
  >
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

const {moveProjectToDelete, moveProjectToEdit} = useResourceStore();
const props = defineProps({
  project: {
    type: Object,
    required: true,
  }
});
const project = toRef(props, 'project');
const projectId = computed(() => project.value?.id);
const projectName = computed(() => project.value?.name);
const deleteProject = () => moveProjectToDelete(projectId.value);
const editProject = () => moveProjectToEdit(projectId.value);
</script>

<style lang="css" scoped>

</style>
