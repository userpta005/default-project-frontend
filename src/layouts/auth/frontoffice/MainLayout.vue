<template>
  <q-layout view="hHh Lpr lff">
    <q-page-container class="q-pa-sm">
      <XHeader class="q-mb-xl" />

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import XHeader from 'src/components/layouts/frontoffice/XHeader.vue';
import { useAuthStore } from 'src/stores/auth';
import { useDarkModeStore } from 'src/stores/darkMode';
import { onMounted } from 'vue';

const darkMode = useDarkModeStore();
darkMode.initialize();

const auth = useAuthStore();

onMounted(async () => {
  await auth.syncAuth();
});
</script>
