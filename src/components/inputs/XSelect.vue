<style lang="scss" scoped>
.q-field :deep(.q-field__control::before) {
  border-color: v-bind(borderColorRoot) !important;
}

.q-field :deep(.q-field__control) {
  background: v-bind(bgColorRoot) !important;
}
.q-field :deep(.q-field__native) {
  color: v-bind(textColorRoot) !important;
}

.q-field :deep(.q-field__control > div) {
  opacity: 1 !important;
}
</style>

<template>
  <q-select
    v-model="value"
    @filter="filterFn"
    @focus="getOpcoesManually"
    :options="optionsFiltered"
    :option-label="optionLabel"
    :option-value="optionValue"
    :use-input="useInput"
    :loading="loading"
    ref="XSelect"
    lazy-rules="ondemand"
    hide-bottom-space
    emit-value
    map-options
    outlined
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
  </q-select>
</template>

<script setup>
import { colors } from 'quasar';
import { api } from 'src/boot/axios';
import notify from 'src/composables/notify';
import { useDarkModeStore } from 'src/stores/darkMode';
import helpers from 'src/utils/helpers';
import { computed, onMounted, ref, useAttrs, useSlots, watch } from 'vue';

const XSelect = ref();
const hasError = computed(() => XSelect.value?.hasError);
defineExpose({
  hasError,
});

const slots = useSlots();
const attrs = useAttrs();

const props = defineProps({
  modelValue: {
    required: false,
  },
  options: {
    type: Array,
    required: false,
    default(rawProps) {
      return [];
    },
  },
  optionValue: {
    type: String,
    required: false,
    default: 'id',
  },
  optionLabel: {
    type: String,
    required: false,
    default: 'name',
  },
  borderColor: {
    type: String,
    required: false,
  },
  bgColorDisable: {
    type: String,
    required: false,
  },
  textColor: {
    type: String,
    required: false,
  },
  apiGetOptions: {
    type: String,
    required: false,
  },
  apiGetOptionsParams: {
    type: Object,
    required: false,
    default(rawProps) {
      return {};
    },
  },
  useFilter: {
    type: Boolean,
    required: false,
    default: false,
  },
  usePreOption: {
    type: Boolean,
    required: false,
    default: false,
  },
  preOptionLabel: {
    type: String,
    required: false,
    default: 'Selecione uma opção...',
  },
  fetchWhenSearching: {
    type: Boolean,
    required: false,
    default: false,
  },
  fetchAllManually: {
    type: Boolean,
    required: false,
    default: false,
  },
  fetchAllOnMounted: {
    type: Boolean,
    required: false,
    default: false,
  },
  whereInId: {
    type: Array,
    required: false,
    default() {
      return [];
    },
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

const loading = ref(false);
const darkMode = useDarkModeStore();

const borderColorRoot = computed(() => {
  if (darkMode.isActive && !props.borderColor) {
    return 'white';
  }

  if (!!props.borderColor) {
    return helpers.isHexColor(props.borderColor) ? props.borderColor : colors.getPaletteColor(props.borderColor);
  }

  return 'rgba(0, 0, 0, 0.24)';
});

const bgColorRoot = computed(() => {
  if ('disable' in attrs && !!props.bgColorDisable) {
    return helpers.isHexColor(props.bgColorDisable) ? props.bgColorDisable : colors.getPaletteColor(props.bgColorDisable);
  }

  if ('bg-color' in attrs) {
    return helpers.isHexColor(props.bgColorDisable) ? props.bgColorDisable : colors.getPaletteColor(attrs['bg-color']);
  }

  return null;
});

const textColorRoot = computed(() => {
  if (darkMode.isActive && !props.textColor) {
    return 'white';
  }

  if (!!props.textColor) {
    return helpers.isHexColor(props.textColor) ? props.textColor : colors.getPaletteColor(props.textColor);
  }

  return 'rgba(0, 0, 0, 0.87)';
});

const focused = ref(false);

const loaded = ref(false);

const useInput = computed(() => !!props.useFilter);

const preOption = computed(() => [{ id: null, [props.optionLabel]: props.preOptionLabel }]);

const optionsWithPreOptionChecked = computed(() => (props.usePreOption ? preOption.value.concat(props.options) : props.options));

const optionsDefault = ref(optionsWithPreOptionChecked.value);

const optionsFiltered = ref(optionsWithPreOptionChecked.value);

watch(
  () => props.options,
  () => {
    optionsDefault.value = optionsWithPreOptionChecked.value;
    optionsFiltered.value = optionsWithPreOptionChecked.value;
  }
);

const filterFn = async (val, update) => {
  if (val.length <= 0) {
    update(() => {
      optionsFiltered.value = optionsDefault.value;
    });
    return;
  }

  if (props.fetchWhenSearching) {
    try {
      const { data } = await api({
        url: props.apiGetOptions,
        params: { search: val, ...props.apiGetOptionsParams },
      });
      loaded.value = true;
      optionsDefault.value = props.usePreOption ? preOption.value.concat(data.data) : data.data;
      optionsFiltered.value = props.usePreOption ? preOption.value.concat(data.data) : data.data;
    } catch (error) {
      notify.error(error);
      abort();
    }
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsFiltered.value = optionsDefault.value.filter((v) => v[props.optionLabel].toLowerCase().indexOf(needle) > -1);
  });
};

const isOpcoesManually = computed(() => {
  return props.fetchAllManually && !focused.value;
});

const getOpcoesManually = async () => {
  if (isOpcoesManually.value) {
    focused.value = true;
    loaded.value = true;
    await getOpcoes();
  }
};

const isFirstLoad = computed(() => {
  return (props.fetchAllManually || props.fetchWhenSearching) && !loaded.value && props.whereInId.length > 0;
});

const getOpcoes = async () => {
  try {
    loading.value = true;
    let apiGetOptionsParams = props.apiGetOptionsParams;

    if (isFirstLoad.value) {
      apiGetOptionsParams = { ...props.apiGetOptionsParams, whereInId: props.whereInId };
    }

    const { data } = await api({ url: props.apiGetOptions, params: apiGetOptionsParams });
    optionsDefault.value = props.usePreOption ? preOption.value.concat(data.data) : data.data;
    optionsFiltered.value = props.usePreOption ? preOption.value.concat(data.data) : data.data;
    loading.value = false;
  } catch (error) {
    loading.value = false;
    notify.error(error);
  }
};

onMounted(async () => {
  if (isFirstLoad.value && !props.fetchAllOnMounted) {
    getOpcoes();
    loaded.value = true;
  } else if (props.fetchAllOnMounted) {
    await getOpcoes();
  }
});

watch(
  () => props.whereInId,
  () => {
    if (isFirstLoad.value) {
      getOpcoes();
      loaded.value = true;
    }
  }
);
</script>
