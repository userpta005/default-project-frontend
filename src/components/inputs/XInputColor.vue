<template>
  <XInput
    v-model="value"
    label="Cor"
    data-maska="!#HHHHHH"
    data-maska-tokens="H:[0-9a-fA-F]"
    v-maska
  >
    <template v-slot:prepend>
      <q-icon
        name="colorize"
        class="cursor-pointer"
      >
        <q-popup-proxy
          cover
          transition-show="scale"
          transition-hide="scale"
        >
          <q-color v-model="value" />
        </q-popup-proxy>
      </q-icon>
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
import XInput from 'src/components/inputs/XInput.vue';
import { vMaska } from 'maska';
import { computed, useSlots } from 'vue';

const slots = useSlots();

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>
