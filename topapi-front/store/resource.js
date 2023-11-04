import { defineStore } from "pinia";
export const useResourceStore = defineStore("resource", {
  state: () => ({
    deleteMode: '',
    deletingGroup: null,
    editingGroup: null,
    editingProject: null,
    deletingProject: null,
    activeGroupId: 0,
    groupDialog: false,
    projectDialog: false,
    projectGroups: [],
  }),
  actions: {
    async updateProject(params) {
      const {data: {_rawValue}} = await taFetch('/projects/' + this.editingProject.id, {
        method: 'PUT',
        body: params
      });
      const targetGroup = this.projectGroups.find(group => group.id === this.activeGroupId);
      if (targetGroup) {
        targetGroup.projects = targetGroup.projects.map(project => project.id === this.editingProject.id ? _rawValue : project);
      }
      this.projectDialog = false;
    },
    moveProjectToEdit(id) {
      const targetGroup = this.projectGroups.find(group => group.id === this.activeGroupId);
      if (targetGroup) {
        this.editingProject = targetGroup.projects.find(project => project.id === id);
        if (!!this.editingProject) {
          this.projectDialog = true;
        }
      }
    },
    async deleteProject() {
      await taFetch('/projects/' + this.deletingProject.id, {method: 'DELETE'});
      const targetGroup = this.projectGroups.find(group => group.id === this.activeGroupId);
      if (targetGroup) {
        targetGroup.projects = targetGroup.projects.filter(project => project.id !== this.deletingProject.id);
      }
      this.deleteMode = '';
    },
    moveProjectToDelete(id) {
      const targetGroup = this.projectGroups.find(group => group.id === this.activeGroupId);
      if (targetGroup) {
        this.deletingProject = targetGroup.projects.find(project => project.id === id);
        this.deleteMode = 'project';
      }
    },
    async addProject(params) {
      const {data: {_rawValue}} = await taFetch('/projects', {
        method: 'POST',
        body: params
      });
      const targetGroup = !!this.projectGroups.length && this.projectGroups.find(group => group.id === this.activeGroupId);
      if (!!targetGroup) {
        targetGroup.projects.unshift(_rawValue);
      }
      this.projectDialog = false;
    },
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
    rusDate: state => dateStr => {
      const date = new Date(dateStr);
      const options =  {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };
      return date.toLocaleString("ru", options);
    },
    activeGroup: state => !!state.activeGroupId && state.projectGroups.length
        && state.projectGroups.find(group => group.id === state.activeGroupId) || null,
    deleteDialog: state => !!state.deleteMode,
    projects() {
      return !!this.activeGroup && this.activeGroup.projects || [];
    }
  }
});
