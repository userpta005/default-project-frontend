<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">403</div>

      <div
        class="text-h2"
        style="opacity: 0.4"
      >
        Opa, seu endereço de e-mail não foi verificado.
      </div>

      <q-btn
        @click="logout"
        :loading="loading"
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Clique aqui para reenviar o link de verificação de e-mail."
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
  await auth.resendEmailVerification();
  loading.value = false;
};
</script>
