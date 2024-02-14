<template>
  <q-uploader
    @uploaded="uploaded()"
    @@failed="failed()"
    :headers="[
      { name: 'X-Requested-With', value: 'XMLHttpRequest' },
      { name: 'Accep', value: 'application/json, text/plain, */*' },
      { name: 'X-XSRF-TOKEN', value: $q.cookies.get('XSRF-TOKEN') },
    ]"
    label="Arquivo"
    accept=".jpg,.jpeg,.png, image/*"
    max-file-size="2000000"
    field-name="file"
    with-credentials
  >
    <template
      v-for="(_, slot) in slots"
      :key="slot"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
        :key="slot"
      />
    </template>
  </q-uploader>
</template>

<script setup>
import notify from 'src/composables/notify';
import { useSlots } from 'vue';

const slots = useSlots();

const uploaded = () => {
  notify.success('Arquivo enviado com sucesso !');
};

const failed = () => {
  notify.error('Falha ao enviar arquivo!');
};
</script>
