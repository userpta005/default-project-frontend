import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import notify from 'src/composables/notify';
import { useCacheStore } from './cache';

export const useEnumsStore = defineStore('enums', {
  state: () => ({
    enums: {},
  }),
  actions: {
    reset() {
      this.enums = {};
    },
    async getEnums() {
      try {
        const cache = useCacheStore();

        if (!cache.get('enums')) {
          const response = await api({ url: '/api/enums' });
          cache.set('enums', response.data, 3600000); // 1 hora de cache
          this.enums = response.data;
        }
      } catch (error) {
        notify.error(error);
      }
    },
    getEnum(name) {
      return this.enums[name];
    },
    getName(name, val) {
      const status = name in this.enums ? this.enums[name].find((item) => item.id === val) : null;
      if (status) {
        return status.name;
      }
      return 'Não informado';
    },
    getColor(name, val) {
      const status = name in this.enums ? this.enums[name].find((item) => item.id === val) : null;
      if (status) {
        return status.color;
      }
      return '#000000';
    },
  },
  persist: true,
});
