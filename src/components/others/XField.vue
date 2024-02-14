<style lang="scss" scoped>
.x-content :deep(img) {
  width: 100% !important;
}
</style>

<template>
  <q-field
    filled
    outlined
    stack-label
  >
    <template
      v-if="value !== null && value !== undefined"
      v-slot:control
    >
      <div
        class="x-content self-center fit"
        v-html="value"
      />
    </template>
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
  </q-field>
</template>

<script setup>
import { useSlots } from 'vue';

const slots = useSlots();

const props = defineProps({
  value: {
    type: [String, Number],
    required: false,
  },
});
</script>
