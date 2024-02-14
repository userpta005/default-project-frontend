<style lang="scss" scoped>
.q-field :deep(.q-field__control::before) {
  border-color: v-bind(borderColorRoot) !important;
}

.q-field :deep(.q-field__control) {
  background: v-bind(bgColorRoot) !important;
}
.q-field :deep(.q-field__native) {
  color: v-bind(textColorRoot) !important;
}

.q-field :deep(.q-field__control > div) {
  opacity: 1 !important;
}
</style>

<template>
  <q-file
    @rejected="onRejected"
    ref="QFileRef"
    for="QFileRef"
    accept=".jpg,.jpeg,.png,.pdf,.xls,.xlsx"
    max-file-size="20000000"
    lazy-rules="ondemand"
    hide-bottom-space
    outlined
  >
    <template v-slot:prepend>
      <label for="QFileRef">
        <XBtn
          @click="openFileInput"
          :color="openFileInputColor"
          tooltip-label="Procurar Arquivos"
          icon="mdi-file-find"
          dense
          flat
        />
      </label>
    </template>
    <template v-slot:after>
      <XBtn
        @click="$q.dialog({ component: XDialogFile, componentProps: { archiveable_type, archiveable_id, editMode } })"
        :color="showFilesColor"
        tooltip-label="Ver Arquivos Atuais"
        icon="mdi-eye"
        dense
        flat
        v-viewer
      />
    </template>
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
  </q-file>
</template>

<script setup>
import { computed, ref, useAttrs, useSlots } from 'vue';
import XBtn from '../buttons/XBtn.vue';
import notify from 'src/composables/notify';
import { colors, useQuasar } from 'quasar';
import helpers from 'src/utils/helpers';
import { useDarkModeStore } from 'src/stores/darkMode';
import XDialogFile from '../others/XDialogFile.vue';

const QFileRef = ref();
const hasError = computed(() => QFileRef.value?.hasError);
defineExpose({
  hasError,
});

const attrs = useAttrs();
const slots = useSlots();

const props = defineProps({
  archiveable_type: {
    type: String,
    required: true,
  },
  archiveable_id: {
    type: Number,
    required: false,
  },
  borderColor: {
    type: String,
    required: false,
  },
  bgColorDisable: {
    type: String,
    required: false,
  },
  textColor: {
    type: String,
    required: false,
  },
  openFileInputColor: {
    type: String,
    required: false,
    default: 'primary',
  },
  showFilesColor: {
    type: String,
    required: false,
    default: 'primary',
  },
  editMode: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const darkMode = useDarkModeStore();

const borderColorRoot = computed(() => {
  if (darkMode.isActive && !props.borderColor) {
    return 'white';
  }

  if (!!props.borderColor) {
    return helpers.isHexColor(props.borderColor) ? props.borderColor : colors.getPaletteColor(props.borderColor);
  }

  return 'rgba(0, 0, 0, 0.24)';
});

const bgColorRoot = computed(() => {
  if ('disable' in attrs && !!props.bgColorDisable) {
    return helpers.isHexColor(props.bgColorDisable) ? props.bgColorDisable : colors.getPaletteColor(props.bgColorDisable);
  }

  if ('bg-color' in attrs) {
    return helpers.isHexColor(props.bgColorDisable) ? props.bgColorDisable : colors.getPaletteColor(attrs['bg-color']);
  }

  return null;
});

const textColorRoot = computed(() => {
  if (darkMode.isActive && !props.textColor) {
    return 'white';
  }

  if (!!props.textColor) {
    return helpers.isHexColor(props.textColor) ? props.textColor : colors.getPaletteColor(props.textColor);
  }

  return 'rgba(0, 0, 0, 0.87)';
});

const $q = useQuasar();

const openFileInput = () => {
  const input = document.getElementById('QFileRef');
  input.click();
};

const onRejected = (rejectedEntries) => {
  if (rejectedEntries[0].failedPropValidation === 'accept') {
    notify.error('Atenção, formato inválido! Insira um arquivo em um desses formatos: .jpg, .jpeg, .png, .pdd, .xls ou .xlsx!');
  } else if (rejectedEntries[0].failedPropValidation === 'max-file-size') {
    notify.error('Atenção, arquivo muito grande! Tamanho máximo permitido: 20MB!');
  }
};
</script>
