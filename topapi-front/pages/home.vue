<template>
  <div>
    <v-navigation-drawer>
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
              <v-list>
                <v-list-item
                  class="touchable fade"
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
  </div>
</template>

<script setup>
definePageMeta({ middleware: "auth" });
import {useMainStore} from "~/store/main.js";
import {useResourceStore} from "~/store/resource.js";

const resourceStore = useResourceStore();
const {groupDialog, activeGroupId, editingGroup} = storeToRefs(resourceStore);
const {moveToEdit, moveToDelete} = resourceStore;
const {authorized, userEmail, user} = useMainStore();
const config = useRuntimeConfig();
const userAvatarPath = computed(() => {
  if (user.value && user.value.avatar) {
    return config.public.storageBase + '/' + user.value.avatar;
  } else {
    return config.public.imageBase + '/default.jpg';
  }
});
const projectGroups = computed(() =>
  resourceStore.projectGroups.map(item => ({title: item.name, value: item.id})));
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
.fade {

}
.fade:hover {
  background-color: #f4f4f4;
}
</style>
