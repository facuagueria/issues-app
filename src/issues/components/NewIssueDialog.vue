<script setup lang="ts">
import { ref, watch } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import useIssueMutation from 'src/issues/composables/useIssueMutation';

interface Props {
  isOpen: boolean;
  labels: string[];
}

interface Emits {
  (e: 'onClose'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { issueMutation } = useIssueMutation();

const isOpen = ref<boolean>(false);
const title = ref<string>('');
const body = ref<string>('');
const labels = ref<string[]>([]);

watch(props, () => {
  isOpen.value = props.isOpen;
});

watch(
  () => issueMutation.isSuccess.value,
  (isSuccess) => {
    if (isSuccess) {
      title.value = '';
      body.value = '';
      labels.value = [];

      issueMutation.reset();
      emits('onClose');
    }
  }
);
</script>

<template>
  <template>
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="isOpen" position="bottom" persistent>
        <q-card style="width: 500px">
          <q-form @submit="issueMutation.mutate({ title, body, labels })">
            <q-linear-progress :value="1" color="primary" />

            <q-card-section class="column no-wrap">
              <div>
                <div class="text-weight-bold">New Issue</div>
                <div class="text-grey">Add new issue with labels</div>
              </div>

              <q-space />
              <div>
                <q-input
                  dense
                  label="Title"
                  v-model="title"
                  class="q-mb-sm"
                  :rules="[(val) => !!val || 'Title is required']"
                />
                <q-select
                  v-model="labels"
                  multiple
                  :options="props.labels"
                  use-chips
                  stack-label
                  label="Multiple Selection"
                  class="q-mb-sm"
                  dense
                />
                <md-editor
                  v-model="body"
                  placeholder="# Markdown"
                  language="en-US"
                />
              </div>
            </q-card-section>
            <q-card-actions align="left">
              <q-btn
                @click="emits('onClose')"
                label="Cancel"
                flat
                color="dark"
                v-close-popup
                :disable="issueMutation.isLoading.value"
              />
              <q-space />
              <q-btn
                type="submit"
                label="Add Issue"
                flat
                color="dark"
                :disable="issueMutation.isLoading.value"
              />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog>
    </div>
  </template>
</template>

<style scoped></style>
