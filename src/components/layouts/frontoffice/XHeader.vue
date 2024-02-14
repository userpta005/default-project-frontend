<template>
  <div class="x-container">
    <div class="row flex-center q-gap-xs q-mb-sm">
      <XBtn
        :to="{ name: 'frontoffice.painel' }"
        class="col-md-auto col-xs-12"
        flat
      >
        <img
          src="/images/logo.png"
          width="230"
          height="100"
        />
      </XBtn>

      <q-space v-if="$q.screen.gt.sm" />

      <template
        v-for="(item, key) in itemsPermitidos"
        :key="key"
      >
        <q-btn-dropdown
          :label="item.label"
          :to="item.to"
          :dropdown-icon="!('children' in item) ? 'none' : ''"
          :class="$q.dark.isActive ? 'text-white' : 'text-black'"
          class="fs-16 text-weight-regular col-md-auto col-xs-12"
          menu-anchor="top start"
          menu-self="bottom start"
          color="white"
          size="md"
          no-caps
          flat
          dense
        >
          <q-list v-if="'children' in item">
            <div
              v-for="(child, index) in item.children"
              :key="index"
            >
              <q-item
                v-if="'permission' in child ? auth.hasPermission(child.permission) : true"
                :to="child.to"
                v-close-popup
                clickable
                dense
              >
                <q-item-section>
                  <q-item-label>
                    {{ child.label }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-btn-dropdown>
      </template>

      <q-space v-if="$q.screen.gt.sm" />

      <XBtn
        @click="darkMode.toggle()"
        :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
        :tooltip-label="$q.dark.isActive ? 'Sair do modo escuro' : 'Colocar em modo escuro'"
      />

      <XBtn
        @click="logout"
        :loading="btnLogoutLoading"
        label="Sair"
      />
    </div>

    <q-separator />
  </div>
</template>

<script setup>
import XBtn from 'src/components/buttons/XBtn.vue';
import { useAuthStore } from 'src/stores/auth';
import { ref } from 'vue';
import { useDarkModeStore } from 'src/stores/darkMode';

const darkMode = useDarkModeStore();

const auth = useAuthStore();

const items = [
  {
    label: 'Painel',
    permission: 'frontoffice.painel_page',
    to: { name: 'frontoffice.painel' },
  },
  {
    label: 'Painel Administrativo',
    permission: 'backoffice.painel_page',
    to: { name: 'backoffice.painel' },
  },
];

const itemsPermitidos = items.filter((vl) => auth.hasPermission(vl.permission));

const btnLogoutLoading = ref(false);

const logout = async () => {
  btnLogoutLoading.value = true;
  await auth.logout();
  btnLogoutLoading.value = false;
};
</script>
