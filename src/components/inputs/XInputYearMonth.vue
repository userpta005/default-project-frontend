<template>
  <XInput
    v-model="value"
    ref="XInputRef"
    mask="##/####"
    clearable
  >
    <template #default>
      <q-popup-proxy
        transition-show="scale"
        transition-hide="scale"
      >
        <q-date
          v-model="qdate"
          @update:model-value="onUpdateDate"
          :options="options"
          ref="dateRef"
          default-view="Years"
          mask="YYYY-MM"
          emit-immediately
          minimal
        >
          <div class="row items-center justify-end">
            <q-btn
              v-close-popup
              label="Fechar"
              color="primary"
              flat
              no-caps
            />
          </div>
        </q-date>
      </q-popup-proxy>
    </template>
    <template #prepend>
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
      return dayjs(props.modelValue, 'YYYY-MM-DD').format('MM/YYYY');
    }
    return props.modelValue;
  },
  set(value) {
    if (dayjs(value, 'YYYY-MM').isValid()) {
      emit('update:modelValue', dayjs(value, 'YYYY-MM').format('YYYY-MM-DD'));
    } else if (dayjs(value, 'MM/YYYY').isValid()) {
      emit('update:modelValue', dayjs(value, 'MM/YYYY').format('YYYY-MM-DD'));
    } else {
      emit('update:modelValue', value);
    }
  },
});

const qdate = ref();

watch(qdate, (newValue, oldValue) => {
  if (dayjs(newValue, 'YYYY-MM').isValid()) {
    value.value = newValue;
  }
});

const dateRef = ref(null);
const currentView = ref('Years');
const onUpdateDate = (val) => {
  currentView.value = currentView.value === 'Years' ? 'Months' : 'Years';
  dateRef.value.setView(currentView.value);
};
</script>
