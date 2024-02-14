<template>
  <q-btn
    :style="{ minWidth: attrs.label ? '100px' : '' }"
    :class="{ 'full-width': !!$q.screen.xs }"
    color="primary"
    no-caps
  >
    <XTooltip
      v-if="tooltipLabel"
      :label="tooltipLabel"
      :position="tooltipPosition"
    />
    <template
      v-for="(_, slot) in slots"
      :key="slot"
      v-slot:[slot]="scope"
    >
      <slot
        v-bind="scope"
        :name="slot"
        :key="slot"
      >
      </slot>
    </template>
  </q-btn>
</template>

<script setup>
import XTooltip from 'src/components/others/XTooltip.vue';
import { useAttrs, useSlots } from 'vue';

const attrs = useAttrs();

const slots = useSlots();

defineProps({
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
