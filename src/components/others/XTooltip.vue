<template>
  <q-tooltip
    v-bind="computedPosition"
    class="fs-13 bg-grey-10"
  >
    {{ label }}
  </q-tooltip>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: false,
    default: 'bottom',
    validator(value) {
      return ['top', 'right', 'bottom', 'left'].includes(value);
    },
  },
});

const positions = {
  top: {
    anchor: 'top middle',
    self: 'bottom middle',
  },
  right: {
    anchor: 'center right',
    self: 'center left',
  },
  bottom: {
    anchor: 'bottom middle',
    self: 'top middle',
  },
  left: {
    anchor: 'center left',
    self: 'center right',
  },
};

const computedPosition = computed(() => {
  return positions[props.position];
});
</script>
