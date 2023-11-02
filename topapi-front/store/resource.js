import { defineStore } from "pinia";
export const useResourceStore = defineStore("resource", {
  state: () => ({
    deleteMode: '',
    deletingGroup: null,
    editingGroup: null,
    activeGroupId: 0,
    groupDialog: false,
    projectGroups: [],
  }),
  actions: {
    async deleteGroup(){
      await taFetch('/project-groups/' + this.activeGroupId,{method: 'DELETE'});
      this.projectGroups = this.projectGroups.filter(item => item.id !== this.activeGroupId);
      this.deleteMode = '';
    },
    async updateGroup({name, comment}){
      const {data: {_rawValue}} = await taFetch('/project-groups/' + this.activeGroupId, {
        method: 'PUT',
        body: {
          name,
          comment
        }
      });
      this.projectGroups = this.projectGroups.map(item => item.id === this.activeGroupId ? _rawValue : item);
      this.groupDialog = false;
    },
    moveToDelete() {
      this.deletingGroup = this.projectGroups.find(item => item.id === this.activeGroupId);
      this.deleteMode = 'group';
    },
    moveToEdit() {
      this.editingGroup = this.projectGroups.find(item => item.id === this.activeGroupId);
      this.groupDialog = true;
    },
    async addGroup({name, comment}) {
      const {data: {_rawValue}} = await taFetch('/project-groups', {
        method: 'POST',
        body: {
          name,
          comment
        }
      });
      this.projectGroups.push(_rawValue);
      this.groupDialog = false;
    },
    async getProjectGroups() {
      const {data: {_rawValue}} = await taFetch('/project-groups');
      this.projectGroups = _rawValue;
    }
  },
  getters: {
    deleteDialog: state => !!state.deleteMode
  }
});
