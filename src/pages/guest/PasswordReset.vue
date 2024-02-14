<template>
  <q-page>
    <q-card>
      <q-card-section class="q-pa-lg">
        <XTitle
          class="text-center"
          label="Preencha o campo abaixo com sua nova senha"
        />
      </q-card-section>

      <q-separator />

      <q-card-section class="column flex-center q-pa-lg">
        <div>Ao menos 8 caracteres</div>
        <div>Letras Maiúsculas</div>
        <div>Letras Minúsculas</div>
        <div>Números</div>
        <div>Caracteres Especiais</div>
      </q-card-section>

      <q-card-section class="q-pa-lg">
        <q-form @submit="submit">
          <XGroup>
            <XInputPwd
              v-model="form.password"
              :rules="[(val) => (!!val && val.length >= 8) || 'Minímo 8 caracteres!']"
              :outlined="false"
              class="col-12"
              label="Nova senha"
            />

            <XInputPwd
              v-model="form.password_confirmation"
              :rules="[
                (val) => (!!val && val.length >= 8) || 'Minímo 8 caracteres!',
                (val) => val === form.password || 'A senha não corresponde!',
              ]"
              :outlined="false"
              class="col-12"
              label="Confirmação da senha"
            />

            <XBtn
              :loading="loading"
              class="col-12"
              type="submit"
              label="Enviar"
              rounded
            />
          </XGroup>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useRoute } from 'vue-router';
import XInputPwd from 'src/components/inputs/XInputPwd.vue';
import XGroup from 'src/components/others/XGroup.vue';
import XTitle from 'src/components/others/XTitle.vue';
import XBtn from 'src/components/buttons/XBtn.vue';

const auth = useAuthStore();
const route = useRoute();

const loading = ref(false);
const form = ref({
  token: route.params.token,
  email: route.query.email,
  password: null,
  password_confirmation: null,
});

const submit = async () => {
  loading.value = true;
  await auth.resetPassword(form.value);
  loading.value = false;
};
</script>
