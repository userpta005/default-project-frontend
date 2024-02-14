<template>
  <XInput :type="isPwd ? 'password' : 'text'">
    <template #append>
      <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        @click="isPwd = !isPwd"
        class="cursor-pointer"
      />
    </template>
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
  </XInput>
</template>

<script setup>
import { ref, useSlots } from 'vue';
import XInput from 'src/components/inputs/XInput.vue';

const slots = useSlots();

const isPwd = ref(true);
</script>
