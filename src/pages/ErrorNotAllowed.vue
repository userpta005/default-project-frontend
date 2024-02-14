<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">403</div>

      <div
        class="text-h2"
        style="opacity: 0.4"
      >
        Opa, você não tem permissão para essar essa página.
      </div>

      <q-btn
        @click="logout"
        :loading="loading"
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Sair"
        no-caps
      />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from 'src/stores/auth';
import { ref } from 'vue';

const auth = useAuthStore();
const loading = ref(false);

const logout = async () => {
  loading.value = true;
  await auth.logout();
  loading.value = false;
};
</script>
