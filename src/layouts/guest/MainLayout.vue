<style lang="scss" scoped>
.q-page-container {
  background: linear-gradient(120deg, $secondary, $primary);
}
</style>

<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="column items-center q-gap-xl q-pa-sm">
      <img
        src="/images/logo.png"
        class="q-mt-xl"
        width="250"
        height="120"
      />

      <XPageTitle label="Project Default" />

      <router-view style="max-width: 400px; width: 100%" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import XPageTitle from 'src/components/others/XPageTitle.vue';
import { useDarkModeStore } from 'src/stores/darkMode';

const darkMode = useDarkModeStore();
darkMode.initialize();
</script>
