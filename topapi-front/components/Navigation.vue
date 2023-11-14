<template>
  <v-navigation-drawer
    v-model="drawer"
  >
    <v-list-item
      :prepend-avatar="userAvatarPath"
      :title="userEmail"
    />
    <v-divider/>
    <v-expansion-panels
      class="mt-3"
      variant="accordion"
      v-model="panels"
      :readonly="readOnly"
    >
      <v-expansion-panel
        title="Группы проектов"
      >
        <v-expansion-panel-text>
          <div
            class="panel"
            :class="{active: item.value === activeGroupId, touchable: !readOnly}"
            v-for="(item, index) in projectGroups"
            :key="index"
            @click="select(item.value)"
          >
            <span>{{item.title}}</span>
            <v-spacer/>
            <template
              v-if="item.value === activeGroupId && !readOnly"
            >
              <v-icon
                color="blue"
                class="touchable"
                icon="mdi-pencil"
                @click="edit"
                title="Редактировать"
              />
              <v-icon
                color="red"
                class="touchable"
                icon="mdi-close"
                @click="showDeleteDialog"
                title="Удалить"
              />
            </template>
          </div>
          <div
            style="display: flex"
            class="mt-2 flex-lg-row-reverse"
          >
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
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-navigation-drawer>
</template>

<script setup>
import {useMainStore} from "~/store/main.js";
import {useResourceStore} from "~/store/resource.js";

const route = useRoute();
const drawer = ref(true);
const panels = ref(null);
const resourceStore = useResourceStore();
const projectGroups = computed(() =>
  resourceStore.projectGroups.map(item => ({title: item.name, value: item.id})));
const {groupDialog, projectDialog, activeGroupId, editingGroup, activeGroup} = storeToRefs(resourceStore);
const {moveToEdit, moveToDelete} = resourceStore;
const {authorized, userEmail, user} = useMainStore();
const config = useRuntimeConfig();
const edit = () => moveToEdit();
const showDeleteDialog = () => moveToDelete();
const showAddGroupDialog = () => {
  activeGroupId.value = 0;
  editingGroup.value = null;
  groupDialog.value = true;
}
const select = id => readOnly.value ? null : activeGroupId.value = id;
onMounted(() => {
  panels.value = activeGroup.value ? 0 : null;
  setTimeout(() => getGroups(), 100)
});
const userAvatarPath = computed(() => {
  if (user.value && user.value.avatar) {
    return config.public.storageBase + '/' + user.value.avatar;
  } else {
    return config.public.imageBase + '/default.jpg';
  }
});
const getGroups = async () => await resourceStore.getProjectGroups();
const readOnly = computed(() => route.name !== 'home');
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
