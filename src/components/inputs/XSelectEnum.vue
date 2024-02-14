<template>
  <XSelect
    v-model:options="options"
    ref="XSelectRef"
  >
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
  </XSelect>
</template>

<script setup>
import { computed, ref, useSlots } from 'vue';
import { useEnumsStore } from 'src/stores/enums';
import XSelect from 'src/components/inputs/XSelect.vue';

const XSelectRef = ref();
const hasError = computed(() => XSelectRef.value?.hasError);
defineExpose({
  hasError,
});

const slots = useSlots();

const props = defineProps({
  enumName: {
    type: String,
    required: true,
  },
});

const enums = useEnumsStore();

const options = ref(enums.getEnum(props.enumName));
</script>
