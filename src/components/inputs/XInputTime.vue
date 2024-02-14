<template>
  <XInput
    v-model="value"
    ref="XInputTime"
    mask="##:##"
    clearable
  >
    <template v-slot:default>
      <q-popup-proxy
        transition-show="scale"
        transition-hide="scale"
      >
        <q-time
          v-model="time"
          :options="options"
          mask="HH:mm"
          minimal
        />
      </q-popup-proxy>
    </template>
    <template #append>
      <q-icon
        name="access_time"
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

const XInputTime = ref();
const hasError = computed(() => XInputTime.value?.hasError);
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
    return props.modelValue;
  },
  set(value) {
    if (dayjs(value, 'HH:mm').isValid()) {
      emit('update:modelValue', value);
      time.value = value;
    } else {
      emit('update:modelValue', value);
      time.value = null;
    }
  },
});

const time = ref(null);

watch(time, (newValue, oldValue) => {
  if (dayjs(newValue, 'HH:mm').isValid()) {
    value.value = newValue;
  }
});
</script>
