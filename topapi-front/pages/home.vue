<template>
  <div>
    <Navigation/>
    <v-col
      v-if="activeGroup"
    >
      <div>Название группы: <strong>{{ activeGroup.name || '' }}</strong></div>
      <v-row
        class="flex-lg-row-reverse"
      >
        <v-btn
          @click="showProjectDialog"
          class="pa-3 ma-3"
        >
          <template v-slot:prepend>
            <v-icon>
              mdi-plus
            </v-icon>
          </template>
          Создать проект
        </v-btn>
      </v-row>
      <ProjectsTable/>
    </v-col>
  </div>
</template>

<script setup>
definePageMeta({ middleware: "auth" });
import {useResourceStore} from "~/store/resource.js";

const resourceStore = useResourceStore();
const {projectDialog, activeGroup} = storeToRefs(resourceStore);
const projectGroups = computed(() =>
  resourceStore.projectGroups.map(item => ({title: item.name, value: item.id})));
const showProjectDialog = () => projectDialog.value = true;
</script>

<style lang="css" scoped>
.panel {
  padding: .3em;
  display: flex;
  align-content: space-between
}
.v-expansion-panel-text__wrapper{
  padding: 0!important;
}
.active {
  background-color: #E0F2F1;
}
.v-expansion-panel-text__wrapper{
  padding: 0!important;
}
.v-list-item--density-compact:not(.v-list-item--nav).v-list-item--one-line{
  padding: 0!important;
}
.v-list {
  padding: 0!important;
}
.v-list-item__content{
  display: inline-flex!important;
}
</style>
