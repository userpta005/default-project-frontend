<template>
  <XBtn
    tooltip-label="Editar"
    icon="mdi-pencil-box-outline"
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
