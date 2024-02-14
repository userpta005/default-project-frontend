<style lang="scss" scoped>
.q-field :deep(.q-field__label) {
  padding-left: 12px;
  padding-right: 12px;
}
.q-field :deep(.q-field__control) {
  padding: 0px;
}
.q-field :deep(.q-field__control .q-field__control-container) {
  padding-top: 30px;
}
.q-field :deep(.q-field__control .q-field__native) {
  flex-direction: column;
  min-height: 250px;
}
.q-field :deep(.ql-toolbar) {
  border-left: 0px;
  border-right: 0px;
  border-top: 1px;
  border-bottom: 1px;
  border-color: rgba(0, 0, 0, 0.24);
  border-style: solid;
  width: 100%;
  display: v-bind(visibility);
}
.q-field :deep(.ql-container) {
  border: 0px;
  width: 100%;
  height: auto;
  flex-grow: 1;
}
.q-field :deep(.ql-editor) {
  padding-left: 12px;
  padding-right: 12px;
}
</style>

<template>
  <XField2
    v-model="value"
    :disable="disable"
    ref="QInputRef"
    stack-label
    no-error-icon
  >
    <template v-slot:control>
      <QuillEditor
        v-model:content="value"
        contentType="html"
        theme="snow"
        :toolbar="[
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ['link', 'video'],
          ['clean'],
        ]"
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
  </XField2>
</template>

<script setup>
import { computed, ref, useSlots } from 'vue';
import XField2 from 'src/components/others/v2/XField2.vue';

const QInputRef = ref();
const hasError = computed(() => QInputRef.value?.hasError);
defineExpose({
  hasError,
});

const slots = useSlots();

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
  },
  disable: {
    type: Boolean,
    required: false,
    default: false,
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

const visibility = computed(() => {
  if (props.disable) {
    return 'none';
  }
  return undefined;
});
</script>
