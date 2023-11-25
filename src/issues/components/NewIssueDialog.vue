<script setup lang="ts">
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const isOpen = ref<boolean>(true);
const title = ref<string>('');
const body = ref<string>('');
const labels = ref<string[]>([]);
</script>

<template>
  <template>
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="isOpen" position="bottom">
        <q-card style="width: 500px">
          <q-form>
            <q-linear-progress :value="1" color="primary" />

            <q-card-section class="column no-wrap">
              <div>
                <div class="text-weight-bold">New Issue</div>
                <div class="text-grey">Add new issue with labels</div>
              </div>

              <q-space />
              <div>
                <q-input label="Title" v-model="title" class="q-mb-sm" />
                <q-select
                  v-model="labels"
                  multiple
                  :options="[]"
                  use-chips
                  stack-label
                  label="Multiple Selection"
                  class="q-mb-sm"
                />
                <md-editor
                  v-model="body"
                  placeholder="# Markdown"
                  language="en-US"
                />
              </div>
            </q-card-section>
            <q-card-actions align="left">
              <q-btn label="Cancel" flat color="dark" v-close-popup />
              <q-space />
              <q-btn
                type="submit"
                label="Add Issue"
                flat
                color="dark"
                v-close-popup
              />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog>
    </div>
  </template>
</template>

<style scoped></style>
