<template>
  <q-dialog
    @hide="onDialogHide"
    ref="dialogRef"
  >
    <q-card
      :class="modal.card_class"
      :style="modal.card_style.sm"
    >
      <q-card-section class="row no-wrap items-center">
        <XModalTitle label="Arquivos" />
        <q-space />
        <XBtnTopCloseModal @click="onDialogCancel" />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <XGroup>
          <div
            v-if="archives.length"
            class="col-12 column q-gap-sm"
          >
            <q-card
              v-for="(item, key) in archives"
              :key="key"
              class="bg-primary"
              style="position: relative"
              bordered
            >
              <q-card-section>
                <a
                  :href="item.archive_url"
                  class="text-secondary"
                  target="_blank"
                >
                  {{ item.name }}
                </a>
                <div class="text-white">Tamanho: {{ (item.size / 1024).toFixed(2) }} KB</div>
                <div class="text-white">Inserido às: {{ helpers.brDateTime(item.created_at) }}</div>
                <div class="text-white">Inserido pelo usuário: {{ item.created_by?.full_name }}</div>
              </q-card-section>
              <XBtn
                v-if="!editMode"
                @click="deleteFile(item.id)"
                :style="{ position: 'absolute', top: '5px', right: '5px' }"
                :loading="loading"
                tooltip-label="Excluir"
                icon="mdi-trash-can-outline"
                color="red"
                padding="none"
                dense
              />
            </q-card>
          </div>
          <div
            v-else
            class="col-12 text-subtitle1 text-center"
          >
            Sem arquivos salvos.
          </div>

          <XBtnGroup>
            <XBtnBottomCloseModal @click="onDialogCancel" />
          </XBtnGroup>
        </XGroup>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import XBtn from '../buttons/XBtn.vue';
import notify from 'src/composables/notify';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import helpers from 'src/utils/helpers';
import XBtnTopCloseModal from '../buttons/XBtnTopCloseModal.vue';
import XBtnBottomCloseModal from '../buttons/XBtnBottomCloseModal.vue';
import XModalTitle from '../others/XModalTitle.vue';
import { createModalState } from 'src/composables/components/modal';
import XGroup from '../others/XGroup.vue';
import XBtnGroup from '../others/XBtnGroup.vue';
import { useDialogPluginComponent } from 'quasar';

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

const props = defineProps({
  archiveable_type: {
    type: String,
    required: true,
  },
  archiveable_id: {
    type: Number,
    required: false,
  },
  editMode: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const { modal } = createModalState();
const $q = useQuasar();
const loading = ref(false);
const archives = ref([]);

const deleteFile = (id) => {
  $q.dialog({
    title: 'Excluir Arquivo',
    message: 'Tem certeza que deseja excluir este arquivo?',
    cancel: true,
    ok: true,
  }).onOk(async () => {
    try {
      loading.value = true;
      const { data } = await api({
        method: 'delete',
        url: `/backoffice/unsafe/archives/${id}`,
      });
      archives.value = archives.value.filter((vl) => vl.id != id);
      loading.value = false;
      notify.success(data.message);
    } catch (error) {
      loading.value = false;
      notify.error(error);
    }
  });
};

const getItem = async () => {
  try {
    const { data } = await api({
      url: `/backoffice/unsafe/archives`,
      params: {
        select: ['id', 'name', 'path', 'extension', 'size', 'archiveable_type', 'archiveable_id', 'created_by', 'created_at'],
        with: ['createdBy:id,name,surname'],
        archiveable_type: props.archiveable_type,
        archiveable_id: props.archiveable_id,
      },
    });
    archives.value = data.data;
  } catch (error) {
    notify.error(error);
  }
};

onMounted(() => {
  getItem();
});
</script>
