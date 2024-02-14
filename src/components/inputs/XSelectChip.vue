<style lang="scss" scoped>
.q-field :deep(.q-chip) {
  background: v-bind(bgColor) !important;
}
</style>

<template>
  <XSelect
    ref="XSelectRef"
    multiple
    use-chips
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
import { colors } from 'quasar';
import XSelect from 'src/components/inputs/XSelect.vue';
import { computed, ref, useSlots } from 'vue';

const XSelectRef = ref();
const hasError = computed(() => XSelectRef.value?.hasError);
defineExpose({
  hasError,
});

const slots = useSlots();

const bgColor = computed(() => {
  return colors.getPaletteColor('grey');
});
</script>
