<template>
  <q-drawer
    :breakpoint="1200"
    :width="270"
    class="bg-primary text-white"
    ref="drawerRef"
    show-if-above
    bordered
  >
    <XBtn
      :to="{ name: 'frontoffice.painel' }"
      class="q-pa-md"
      flat
    >
      <img
        src="/images/logo.png"
        width="220"
        height="120"
      />
    </XBtn>

    <q-separator class="q-my-sm bg-grey" />

    <q-scroll-area :style="{ height: '80vh' }">
      <q-list
        class="column q-gap-y-sm"
        dense
      >
        <!-- PERFIL -->
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="mdi-card-account-details" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ auth.user?.name }}</q-item-label>
          </q-item-section>

          <!-- MENU -->
          <q-menu dark>
            <q-list dense>
              <!-- PERFIL -->
              <q-item
                clickable
                v-close-popup
              >
                <q-item-section>
                  <q-item-label>Perfil</q-item-label>
                </q-item-section>
              </q-item>

              <!-- SAIR DO MODO ADM -->
              <q-item
                :to="{ name: 'frontoffice.painel' }"
                clickable
              >
                <q-item-section>
                  <q-item-label>Sair do Modo Administrador</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />

              <!-- DESLOGAR -->
              <q-item
                @click="logout"
                clickable
              >
                <q-item-section>
                  <q-item-label>Sair</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>

        <q-separator class="bg-grey" />

        <!-- PAINEL -->
        <q-item
          v-if="auth.hasPermission('backoffice.painel_page')"
          :to="{ name: 'backoffice.painel' }"
          active-class="bg-secondary rounded-borders"
          clickable
        >
          <q-item-section avatar>
            <q-icon name="mdi-home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Painel</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>

    <q-separator class="q-my-sm bg-grey" />
  </q-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import XBtn from 'src/components/buttons/XBtn.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const auth = useAuthStore();
const drawerRef = ref();

const logout = async () => {
  $q.loading.show();
  await auth.logout();
  $q.loading.hide();
};
</script>
