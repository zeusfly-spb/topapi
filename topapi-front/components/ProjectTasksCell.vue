<template>
  <td
    class="text-right"
  >
    <span
      class="active"
    >
      {{ activeTasks.length }}
    </span>
    /
    <span
      class="inactive"
    >
      {{ inactiveTasks.length }}
    </span>
    <v-icon
      class="touchable ml-2"
      color="#00BCD4"
      icon="mdi-brightness-7"
      title="Настройка заданий"
      @click="goTasks"
    />
  </td>
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true,
  }
});
const project = toRef(props, 'project');
const tasks = computed(() => project.value.tasks || []);
const activeTasks = computed(() => tasks.value.filter(task => task.active));
const inactiveTasks = computed(() => tasks.value.filter(task => !task.active));
const goTasks = async () => await navigateTo(`project-tasks/${project.value.id}`);
</script>

<style lang="css" scoped>
.active {
  color: green;
}
.inactive {
  color: red;
}
</style>
