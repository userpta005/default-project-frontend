<template>
  <div
    class="row q-gap-sm"
    :class="[computedPosition]"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  position: {
    type: String,
    default: 'right',
    validator(value) {
      return ['left', 'center', 'right'].includes(value);
    },
  },
});

const positions = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

const computedPosition = computed(() => {
  return positions[props.position];
});
</script>
