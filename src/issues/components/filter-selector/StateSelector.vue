<script setup lang="ts">
import { useIssuesStore } from 'stores/issues';

const issuesStore = useIssuesStore();
</script>

<template>
  <q-btn-toggle
    v-model="issuesStore.state"
    toggle-color="primary"
    push
    spread
    :options="[
      { label: 'all', value: '' },
      { label: 'Open', value: 'open' },
      { label: 'Closed', value: 'closed' },
    ]"
  />
</template>
