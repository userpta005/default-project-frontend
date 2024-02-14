<style lang="scss" scoped>
.q-editor :deep(.q-editor__content) {
  color: v-bind(textColorRoot) !important;
}

.q-field :deep(.q-field__control > div) {
  opacity: 1 !important;
}
</style>

<template>
  <q-field
    v-model="value"
    ref="QFieldRef"
    lazy-rules="ondemand"
    hide-bottom-space
    label-slot
    borderless
    stack-label
    no-error-icon
  >
    <template #label>
      <span
        class="fs-18 text-weight-regular"
        :class="{ 'var(--q-negative)': QFieldRef?.hasError }"
        :style="{ color: attrs['label-color'] }"
      >
        {{ attrs.label }}
      </span>
    </template>
    <template #default>
      <q-editor
        v-model="value"
        :style="{ borderColor: QFieldRef?.hasError ? 'var(--q-negative)' : '', cursor: 'text' }"
        class="fit q-mt-xs"
      />
    </template>
  </q-field>
</template>

<script setup>
import { colors } from 'quasar';
import { useDarkModeStore } from 'src/stores/darkMode';
import helpers from 'src/utils/helpers';
import { computed, ref, useAttrs } from 'vue';

const QFieldRef = ref();
const hasError = computed(() => QFieldRef.value?.hasError);
defineExpose({
  hasError,
});

const attrs = useAttrs();

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
  },
  textColor: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const darkMode = useDarkModeStore();

const textColorRoot = computed(() => {
  if (darkMode.isActive) {
    return 'white';
  }

  if (!darkMode.isActive && !!props.textColor) {
    return helpers.isHexColor(props.textColor) ? props.textColor : colors.getPaletteColor(props.textColor);
  }

  return 'black';
});
</script>
