<template>
  <tr>
    <td
      class="id-field"
    >
      {{ project.id }}
    </td>
    <td
      class="name-field"
    >
      {{ project.name }}
    </td>
    <td>
      {{ project.domain }}
    </td>
    <td
      style="max-width: 2em"
    >
    </td>
    <td>
    </td>
    <td>{{ createDate }}</td>
    <ProjectTasksCell
      :project="project"
    />
    <td
      class="cell"
      :style="{color: project.active ? 'green' : 'red'}"
    >
      {{ project.active && 'Активен' || 'Остановлен'}}
    </td>
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

<style lang="css">
.name-field {
  text-align: center;
  max-width: 30em;
}
.id-field {
  text-align: right;
  max-width: 2em;
}
.cell {
  width: 20px!important;
  text-align: right!important;
}
</style>
