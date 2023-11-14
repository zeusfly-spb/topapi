<template>
  <div>
    <Navigation/>
    <v-col>
      <div>
        Группа проектов: <strong>{{ activeGroup && activeGroup.name || '' }}</strong>
      </div>
      <div>
        Проект: <strong>{{ project && project.name || '' }}</strong>
      </div>
      <div
        class="flex-row-reverse"
        style="display: flex; align-content: end"
      >
        <v-btn
          @click="addTask"
        >
          Добавить ключ
        </v-btn>
      </div>

    </v-col>
  </div>
</template>

<script setup>
definePageMeta({ middleware: "auth" });
import {storeToRefs} from "pinia";
import {useResourceStore} from "~/store/resource.js";

const {projects} = useResourceStore();
const {activeGroup} = storeToRefs(useResourceStore());
const route = useRoute();
const id = computed(() => route.params.id);
const project = computed(() => projects.find(item => item.id === Number(id.value)));
const addTask = () => {};
</script>

<style lang="scss" scoped>

</style>
