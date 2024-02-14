import { defineStore } from 'pinia';

export const useCacheStore = defineStore('cache', {
  state: () => ({
    data: {},
  }),
  actions: {
    reset() {
      this.data = {};
    },
    set(key, value, ttl) {
      const now = new Date();
      const item = {
        value: value,
        expiry: now.getTime() + ttl,
      };
      this.data[key] = item;
    },
    setForever(key, value) {
      const now = new Date();
      const item = {
        value: value,
        expiry: now.getTime() + 604800000,
      };
      this.data[key] = item;
    },
    get(key) {
      const item = this.data[key];

      if (!item) {
        return null;
      }

      const now = new Date();

      if (now.getTime() > item.expiry) {
        delete this.data[key];
        return null;
      }
      return item.value;
    },
    delete(key) {
      delete this.data[key];
    },
  },
  persist: true,
});
