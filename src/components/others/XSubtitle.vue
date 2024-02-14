<template>
  <div class="text-subtitle1 text-weight-regular">
    {{ label }}
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
