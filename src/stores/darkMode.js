import { defineStore } from 'pinia';
import { Dark } from 'quasar';
import { setCssVar } from 'quasar';

export const useDarkModeStore = defineStore('darkMode', {
  state: () => ({
    isActive: false,
  }),
  actions: {
    initialize() {
      Dark.set(this.isActive);
      setCssVar('primary', !this.isActive ? '#233253' : '#c59530');
      setCssVar('secondary', !this.isActive ? '#c59530' : '#233253');
    },
    toggle() {
      this.isActive = !this.isActive;
      Dark.set(this.isActive);
      setCssVar('primary', !this.isActive ? '#233253' : '#c59530');
      setCssVar('secondary', !this.isActive ? '#c59530' : '#233253');
    },
  },
  persist: true,
});
