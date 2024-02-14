<template>
  <div>
    <div
      v-if="label"
      class="text-subtitle1 q-mb-sm"
    >
      {{ label }}
    </div>
    <div class="row q-gap-md">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: false,
  },
});
</script>
