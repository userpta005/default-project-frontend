<template>
  <XBtn
    tooltip-label="Fechar"
    icon="mdi-close"
    padding="none"
    flat
    dense
  >
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
  </XBtn>
</template>

<script setup>
import { useSlots } from 'vue';
import XBtn from './XBtn.vue';

const slots = useSlots();
</script>
