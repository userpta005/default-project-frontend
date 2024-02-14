<template>
  <XInput
    v-model="value"
    ref="XInputRef"
    mask="##/##/#### ##:##"
    clearable
  >
    <template #default>
      <q-popup-proxy
        @before-show="beforeShowPopup"
        ref="popupRef"
        transition-show="scale"
        transition-hide="scale"
      >
        <q-date
          v-show="showDate"
          v-model="qdate"
          @update:model-value="changeDate"
          :options="options"
          mask="YYYY-MM-DD"
          today-btn
        >
          <div class="row items-center justify-end q-gap-sm">
            <q-btn
              @click="showDate = false"
              icon="access_time"
              color="primary"
              flat
              no-caps
            />
            <q-btn
              v-close-popup
              label="Fechar"
              color="primary"
              flat
              no-caps
            />
          </div>
        </q-date>
        <q-time
          v-show="!showDate"
          v-model="qtime"
          @update:model-value="changeTime"
          mask="HH:mm"
          format24h
        >
          <div class="row items-center justify-end q-gap-sm">
            <q-btn
              @click="showDate = true"
              icon="event"
              color="primary"
              flat
              no-caps
            />
            <q-btn
              v-close-popup
              label="Fechar"
              color="primary"
              flat
              no-caps
            />
          </div>
        </q-time>
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
import { computed, ref, useSlots } from 'vue';
import XInput from './XInput.vue';
import dayjs from 'src/composables/dayjs';

const popupRef = ref();
const XInputRef = ref();
const hasError = computed(() => XInputRef.value?.hasError);
const hidePopup = computed(() => popupRef.value?.hide);
defineExpose({
  hasError,
  hidePopup,
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

const qdate = ref();
const qtime = ref();
const showDate = ref(true);
const formatDateTimeBr = 'DD/MM/YYYY HH:mm';
const formatDateTimeUSA = 'YYYY-MM-DD HH:mm';
const formatDateBr = 'DD/MM/YYYY';
const formatDateUSA = 'YYYY-MM-DD';

const value = computed({
  get() {
    if (dayjs(props.modelValue, formatDateTimeUSA, true).isValid()) {
      return dayjs(props.modelValue, formatDateTimeUSA, true).format(formatDateTimeBr);
    }
    return props.modelValue;
  },
  set(value) {
    if (dayjs(value, formatDateTimeUSA, true).isValid()) {
      emit('update:modelValue', dayjs(value, formatDateTimeUSA, true).format(formatDateTimeUSA));
    } else if (dayjs(value, formatDateTimeBr, true).isValid()) {
      emit('update:modelValue', dayjs(value, formatDateTimeBr, true).format(formatDateTimeUSA));
      qdate.value = dayjs(value, formatDateTimeBr, true).format(formatDateUSA);
      qtime.value = dayjs(value, formatDateTimeBr, true).format('HH:mm');
    } else {
      emit('update:modelValue', value);
      qdate.value = null;
      qtime.value = null;
    }
  },
});

const beforeShowPopup = () => {
  showDate.value = true;
};

const changeDate = (newValue) => {
  const newDate = dayjs(newValue, formatDateUSA, true);
  const currentDate = dayjs(value.value, formatDateTimeBr, true);

  if (!newDate.isValid()) {
    value.value = null;
    return;
  }

  if (newDate.isValid()) {
    if (
      !currentDate.isValid() ||
      newDate.diff(currentDate.format(formatDateUSA), 'day') > 0 ||
      newDate.diff(currentDate.format(formatDateUSA), 'day') < 0
    ) {
      const newDateTime = newDate
        .set('hour', currentDate.isValid() ? currentDate.get('hour') : 0)
        .set('minute', currentDate.isValid() ? currentDate.get('minute') : 0);

      value.value = newDateTime.format(formatDateTimeUSA);
      qtime.value = newDateTime.format('HH:mm');
      showDate.value = false;
    }
  }
};

const changeTime = (newValue) => {
  const newDate = dayjs(newValue, 'HH:mm', true);
  const currentDate = dayjs(value.value, formatDateTimeBr, true);

  if (
    newDate.isValid() &&
    currentDate.isValid() &&
    (newDate.diff(currentDate.format(formatDateTimeUSA), 'minute') > 0 || newDate.diff(currentDate.format(formatDateTimeUSA), 'minute') < 0)
  ) {
    const newDateTime = currentDate.set('hour', newDate.get('hour')).set('minute', newDate.get('minute'));

    value.value = newDateTime.format(formatDateTimeUSA);
  }
};
</script>
