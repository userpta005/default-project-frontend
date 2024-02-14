<template>
  <q-page class="column q-gap-sm">
    <q-btn
      @click="checkPasswordWithPrompt"
      label="Inserir Senha"
      color="red"
      no-caps
    />
    <q-btn
      @click="migrate"
      :loading="loading[0]"
      label="Migrate"
      color="primary"
      no-caps
    />
    <q-btn
      @click="dbSeed"
      :loading="loading[1]"
      label="DB Seed"
      color="primary"
      no-caps
    />
    <q-btn
      @click="defenderSeeder"
      :loading="loading[2]"
      label="Defender Seeder"
      color="primary"
      no-caps
    />
    <q-btn
      @click="optimizeClear"
      :loading="loading[3]"
      label="Optimize Clear"
      color="primary"
      no-caps
    />
    <q-btn
      @click="optimize"
      :loading="loading[4]"
      label="Optimize"
      color="primary"
      no-caps
    />
  </q-page>
</template>

<script setup>
import notify from 'src/composables/notify';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';

const auth = useAuthStore();
auth.csrf();
const inputPassword = ref();
const loading = ref([false, false, false, false, false, false, false]);

const checkPasswordWithPrompt = () => {
  inputPassword.value = window.prompt('Insira a senha:');
};

const migrate = async () => {
  try {
    loading.value[0] = true;
    const data = await api({
      method: 'post',
      url: '/artisan/migrate',
      params: { password: inputPassword.value },
    });
    loading.value[0] = false;
    notify.success(data.data.message);
  } catch (error) {
    loading.value[0] = false;
    notify.error(error);
  }
};

const dbSeed = async () => {
  try {
    loading.value[1] = true;
    const data = await api({
      method: 'post',
      url: '/artisan/db-seed',
      params: { password: inputPassword.value },
    });
    loading.value[1] = false;
    notify.success(data.data.message);
  } catch (error) {
    loading.value[1] = false;
    notify.error(error);
  }
};

const defenderSeeder = async () => {
  try {
    loading.value[2] = true;
    const data = await api({
      method: 'post',
      url: '/artisan/defender-seeder',
      params: { password: inputPassword.value },
    });
    loading.value[2] = false;
    notify.success(data.data.message);
  } catch (error) {
    loading.value[2] = false;
    notify.error(error);
  }
};

const optimizeClear = async () => {
  try {
    loading.value[3] = true;
    const data = await api({
      method: 'post',
      url: '/artisan/optimize-clear',
      params: { password: inputPassword.value },
    });
    loading.value[3] = false;
    notify.success(data.data.message);
  } catch (error) {
    loading.value[3] = false;
    notify.error(error);
  }
};

const optimize = async () => {
  try {
    loading.value[4] = true;
    const data = await api({
      method: 'post',
      url: '/artisan/optimize',
      params: { password: inputPassword.value },
    });
    loading.value[4] = false;
    notify.success(data.data.message);
  } catch (error) {
    loading.value[4] = false;
    notify.error(error);
  }
};
</script>
