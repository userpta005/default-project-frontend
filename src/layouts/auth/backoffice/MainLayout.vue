<template>
  <q-layout view="lhr LpR lfr">
    <XDrawer v-model="leftDrawerOpen" />

    <q-page-container class="q-ma-sm">
      <div class="full-width flex q-gap-xs q-mb-xl">
        <XBtn
          @click="() => (leftDrawerOpen = !leftDrawerOpen)"
          class="bg-white text-black text-weight-regular"
          label="ALTERNAR"
        />

        <q-space />

        <XBtn
          @click="darkMode.toggle()"
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          :tooltip-label="$q.dark.isActive ? 'Sair do modo escuro' : 'Colocar em modo escuro'"
          class="bg-white text-black"
        />
      </div>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import XDrawer from 'src/components/layouts/backoffice/XDrawer.vue';
import { useDarkModeStore } from 'src/stores/darkMode';
import XBtn from 'src/components/buttons/XBtn.vue';
import { useAuthStore } from 'src/stores/auth';

const leftDrawerOpen = ref(true);
const darkMode = useDarkModeStore();
darkMode.initialize();

const auth = useAuthStore();

onMounted(async () => {
  await auth.syncAuth();
});
</script>
