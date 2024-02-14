<template>
  <div class="text-h6 text-weight-regular">
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
