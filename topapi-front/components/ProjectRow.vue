<template>
  <tr>
    <td
      style="max-width: 2em"
    >
      {{project.id}}
    </td>
    <td
      style="max-width: 30em"
    >
      {{project.name}}
    </td>
    <td
      style="max-width: 2em"
    >
    </td>
    <td
      style="max-width: 2em"
    >
    </td>
    <td>{{ createDate }}</td>
    <td></td>
    <td></td>
    <ProjectActionCell
      :project="project"
    />
  </tr>
</template>

<script setup>
import {useResourceStore} from "~/store/resource.js";

const resourceStore = useResourceStore();
const props = defineProps({
  project: Object
});
const project = toRef(props, 'project');
const createDate = computed(() => resourceStore.rusDate(project.value.created_at));
</script>

<style lang="css" scoped>

</style>
