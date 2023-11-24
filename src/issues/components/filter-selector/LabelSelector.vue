<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useLabels from 'src/issues/composables/useLabels';

const { labelsQuery, toggleLabel, selectedLabels } = useLabels();
</script>

<template>
  <div class="q-mt-md">
    <LoaderSpinner
      v-if="labelsQuery.isLoading.value"
      size="50px"
      :thickness="1"
    />

    <q-chip
      v-else
      v-for="label in labelsQuery.data.value"
      :key="label.id"
      :style="{ color: `#${label.color}` }"
      :outline="!selectedLabels.includes(label.name)"
      clickable
      @click="toggleLabel(label.name)"
    >
      {{ label.name }}
    </q-chip>
  </div>
</template>
