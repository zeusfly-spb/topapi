<template>
  <v-table
    density="compact"
  >
    <thead>
    <tr>
      <th
        style="text-align: right"
      >
        id
      </th>
      <th
        style="text-align: center"
      >
        Название
      </th>
      <th>
        Домен
      </th>
      <th>
        Дневной объем заданий
      </th>
      <th>
        % повторных заходов
      </th>
      <th>Дата создания</th>
      <th
        class="text-right"
      >
        Ключи
      </th>
      <th
        class="cell"
      >
        Статус
      </th>
      <th
        style="text-align: right;"
      >
        Действия
      </th>
    </tr>
    </thead>
    <tbody>
    <ProjectRow
      v-for="(item, index) in projectList"
      :project="item"
      :key="index"
    />
    </tbody>
  </v-table>
</template>

<script setup>
import {useResourceStore} from "~/store/resource.js";

const resourceStore = useResourceStore();
const projectList = computed(() => resourceStore.projects);

</script>

<style lang="css" scoped>
.cell {
  width: 140px!important;
}
</style>
