<template>
  <q-page>
    <q-card>
      <q-card-section class="q-pa-lg">
        <XTitle
          class="text-center"
          label="Preencha o campo abaixo"
        />
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pa-lg">
        <q-form @submit="submit">
          <XGroup>
            <XInput
              v-model="form.email"
              :rules="[(val) => !!val || 'Email é obrigatório!']"
              :outlined="false"
              class="col-12"
              type="email"
              label="email"
            />

            <XBtnGroup
              class="full-width"
              position="center"
            >
              <XBtn
                :to="{ name: 'login' }"
                label="Voltar"
                rounded
              />
              <XBtn
                :loading="loading"
                type="submit"
                label="Enviar"
                rounded
              />
            </XBtnGroup>
          </XGroup>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import XInput from 'src/components/inputs/XInput.vue';
import XGroup from 'src/components/others/XGroup.vue';
import XBtnGroup from 'src/components/others/XBtnGroup.vue';
import XTitle from 'src/components/others/XTitle.vue';
import XBtn from 'src/components/buttons/XBtn.vue';

const auth = useAuthStore();

const loading = ref(false);
const form = ref({ email: null });

const submit = async () => {
  loading.value = true;
  await auth.forgotPassword(form.value);
  loading.value = false;
};
</script>
