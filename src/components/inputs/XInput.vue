<style lang="scss" scoped>
.q-field :deep(.q-field__control::before) {
  border-color: v-bind(borderColorRoot) !important ;
}
.q-field :deep(.q-field__native) {
  color: v-bind(textColorRoot) !important;
}

.q-field :deep(.q-field__control > div) {
  opacity: 1 !important;
}
</style>

<template>
  <q-input
    lazy-rules="ondemand"
    hide-bottom-space
    outlined
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
  </q-input>
</template>

<script setup>
import { colors } from 'quasar';
import helpers from 'src/composables/helpers';
import { computed, useSlots } from 'vue';
import { useDarkModeStore } from 'src/stores/darkMode';

const darkMode = useDarkModeStore();

const slots = useSlots();

const props = defineProps({
  borderColor: {
    type: String,
    required: false,
  },
  textColor: {
    type: String,
    required: false,
  },
});

const borderColorRoot = computed(() => {
  if (props.borderColor) {
    return helpers.isHexColor(props.borderColor) ? props.borderColor : colors.getPaletteColor(props.borderColor);
  }

  return 'rgba(0, 0, 0, 0.24)';
});

const textColorRoot = computed(() => {
  if (props.textColor) {
    return helpers.isHexColor(props.textColor) ? props.textColor : colors.getPaletteColor(props.textColor);
  }

  if (darkMode.isActive) {
    return 'white';
  }

  return 'rgba(0, 0, 0, 0.87)';
});
</script>
