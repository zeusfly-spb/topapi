<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
    >
      <v-list-item
        :prepend-avatar="userAvatarPath"
        :title="userEmail"
      />
      <v-divider/>
      <v-list density="compact">
        <v-expansion-panels
          variant="accordion"
        >
          <v-expansion-panel
            title="Группы проектов"
          >
            <v-expansion-panel-text>
              <v-list
                density="compact"
              >
                <v-list-item
                  class="touchable"
                  :class="{active: item.value === activeGroupId}"
                  v-for="(item, index) in projectGroups"
                  :key="index"
                  @click="select(item.value)"
                >
                  <v-list-item-title v-text="item.title"/>
                  <template
                    v-if="item.value === activeGroupId"
                    v-slot:append
                  >
                    <v-icon
                      icon="mdi-pencil"
                      @click="edit"
                    />
                    <v-icon
                      icon="mdi-close"
                      @click="showDeleteDialog"
                    />
                  </template>
                </v-list-item>
              </v-list>
              <v-btn
                @click="showAddGroupDialog"
                variant="text"
                title="Создать группу проектов"
              >
                <template v-slot:prepend>
                  <v-icon>
                    mdi-plus
                  </v-icon>
                </template>
                Создать
              </v-btn>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-list>
    </v-navigation-drawer>
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
      <v-table
        density="compact"
      >
        <thead>
          <tr>
            <th>id</th>
            <th>Название</th>
            <th>Дневной объем заданий</th>
            <th>Количество повторных заходов</th>
            <th>Дата создания</th>
            <th>Ключи</th>
            <th>Статус</th>
            <th
              style="text-align: right"
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
    </v-col>

  </div>
</template>

<script setup>
definePageMeta({ middleware: "auth" });
import {useMainStore} from "~/store/main.js";
import {useResourceStore} from "~/store/resource.js";

const resourceStore = useResourceStore();
const {groupDialog, projectDialog, activeGroupId, editingGroup, activeGroup} = storeToRefs(resourceStore);
const {moveToEdit, moveToDelete} = resourceStore;
const {authorized, userEmail, user} = useMainStore();
const config = useRuntimeConfig();
const projectList = computed(() => resourceStore.projects);
const userAvatarPath = computed(() => {
  if (user.value && user.value.avatar) {
    return config.public.storageBase + '/' + user.value.avatar;
  } else {
    return config.public.imageBase + '/default.jpg';
  }
});
const drawer = ref(true);
const projectGroups = computed(() =>
  resourceStore.projectGroups.map(item => ({title: item.name, value: item.id})));
const showProjectDialog = () => projectDialog.value = true;
const edit = () => moveToEdit();
const showDeleteDialog = () => moveToDelete();
const select = id => activeGroupId.value = id;
const showAddGroupDialog = () => {
  activeGroupId.value = 0;
  editingGroup.value = null;
  groupDialog.value = true;
}
const getGroups = async () => await resourceStore.getProjectGroups();
onMounted(() => setTimeout(() => getGroups(), 100));
</script>

<style lang="css" scoped>
.active {
  background-color: #e4e4e4;
}
</style>
