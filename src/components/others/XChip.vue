<style scoped lang="scss">
.q-chip {
  background-color: v-bind(backgroundColorRoot) !important;
  color: v-bind(color) !important;
}
</style>

<template>
  <q-chip
    class="cursor-pointer"
    dense
    square
  >
    <div>
      {{ label }}
      <slot name="tooltip" />
    </div>
  </q-chip>
</template>

<script setup>
import { computed } from 'vue';
import { colors } from 'quasar';
import helpers from 'src/utils/helpers';

const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  backgroundColor: {
    type: String,
    required: false,
    default: 'primary',
  },
});

const backgroundColorRoot = computed(() => {
  return helpers.isHexColor(props.backgroundColor) ? props.backgroundColor : colors.getPaletteColor(props.backgroundColor);
});

const color = computed(() => (colors.brightness(props.backgroundColor) < 128 ? 'white' : 'black'));
</script>
