<template>
  <q-page>
    <q-card>
      <q-card-section class="q-pa-lg">
        <XTitle
          class="text-center"
          label="Seja Bem Vindo(a)!"
        />
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pa-lg">
        <q-form @submit="submit">
          <XGroup>
            <XInput
              v-model="auth.form.email"
              :rules="[(val: any) => !!val || 'Email é obrigatório!']"
              :outlined="false"
              class="col-12"
              type="email"
              label="Email"
            />

            <XInputPwd
              v-model="auth.form.password"
              :rules="[(val: any) => (!!val && val.length >= 8) || 'Minímo 8 caracteres!']"
              :outlined="false"
              class="col-12"
              label="Senha"
            />

            <q-checkbox
              v-model="auth.rememberMe"
              class="col-12"
              label="Lembrar-me"
            />

            <XBtnLink
              class="col-12 text-grey"
              label="Esqueceu sua senha?"
              to="/forgot-password"
            />

            <XBtn
              :loading="loading"
              class="col-12"
              type="submit"
              label="Login"
              rounded
            />
          </XGroup>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import XBtnLink from 'src/components/buttons/XBtnLink.vue';
import XInputPwd from 'src/components/inputs/XInputPwd.vue';
import XInput from 'src/components/inputs/XInput.vue';
import XGroup from 'src/components/others/XGroup.vue';
import XTitle from 'src/components/others/XTitle.vue';
import XBtn from 'src/components/buttons/XBtn.vue';

const auth = useAuthStore();

const loading = ref(false);

async function submit() {
  loading.value = true;
  await auth.login();
  loading.value = false;
}
</script>
