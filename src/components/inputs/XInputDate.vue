<template>
  <XInput
    v-model="value"
    ref="XInputRef"
    mask="##/##/####"
    clearable
  >
    <template #default>
      <q-popup-proxy
        transition-show="scale"
        transition-hide="scale"
      >
        <q-date
          v-model="qdate"
          :options="options"
          mask="YYYY-MM-DD"
        />
      </q-popup-proxy>
    </template>
    <template #append>
      <q-icon
        name="event"
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
import { computed, ref, useSlots, watch } from 'vue';
import XInput from './XInput.vue';
import dayjs from 'src/composables/dayjs';

const XInputRef = ref();
const hasError = computed(() => XInputRef.value?.hasError);
defineExpose({
  hasError,
});

const slots = useSlots();

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
  },
  options: {
    type: Array,
    required: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    if (dayjs(props.modelValue, 'YYYY-MM-DD').isValid()) {
      return dayjs(props.modelValue, 'YYYY-MM-DD').format('DD/MM/YYYY');
    }
    return props.modelValue;
  },
  set(value) {
    if (dayjs(value, 'YYYY-MM-DD').isValid()) {
      emit('update:modelValue', dayjs(value, 'YYYY-MM-DD').format('YYYY-MM-DD'));
    } else if (dayjs(value, 'DD/MM/YYYY').isValid()) {
      emit('update:modelValue', dayjs(value, 'DD/MM/YYYY').format('YYYY-MM-DD'));
      qdate.value = dayjs(value, 'DD/MM/YYYY').format('YYYY-MM-DD');
    } else {
      emit('update:modelValue', value);
      qdate.value = null;
    }
  },
});

const qdate = ref();

watch(qdate, (newValue, oldValue) => {
  if (dayjs(newValue, 'YYYY-MM-DD').isValid()) {
    value.value = newValue;
  }
});
</script>
