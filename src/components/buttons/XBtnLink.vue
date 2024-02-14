<template>
  <router-link>
    <XTooltip
      v-if="tooltipLabel"
      :label="tooltipLabel"
      :position="tooltipPosition"
    />
    {{ label }}
  </router-link>
</template>

<script setup>
import XTooltip from 'src/components/others/XTooltip.vue';

defineProps({
  label: {
    type: String,
    required: false,
  },
  tooltipLabel: {
    type: String,
    required: false,
  },
  tooltipPosition: {
    type: String,
    required: false,
  },
});
</script>
