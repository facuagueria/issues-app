<script setup lang="ts">
import { ref } from 'vue';
import FloatingButtons from 'components/FloatingButtons.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import FilterSelector from 'src/issues/components/filter-selector/FilterSelector.vue';
import IssueList from 'src/issues/components/issue-list/IssueList.vue';
import NewIssueDialog from 'src/issues/components/NewIssueDialog.vue';
import useIssues from 'src/issues/composables/useIssues.ts';
import useLabels from 'src/issues/composables/useLabels';

const { issuesQuery } = useIssues();
const { labelsQuery } = useLabels();

const isOpen = ref<boolean>(false);

const openDialog = () => {
  isOpen.value = true;
};
</script>

<template>
  <div class="row q-mb-md">
    <div class="col-12">
      <span class="text-h2">GitHub Issues</span>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-md-4">
      <FilterSelector />
    </div>
    <div class="col-xs-12 col-md-8">
      <LoaderSpinner
        v-if="issuesQuery.isLoading.value"
        show-text
        color="white"
      />
      <IssueList v-else :issues="issuesQuery.data?.value || []" />
    </div>
  </div>
  <!--  Floating buttons-->
  <FloatingButtons
    :buttons="[
      { icon: 'add', color: 'primary', size: 'md', action: openDialog },
    ]"
  />

  <NewIssueDialog
    v-if="labelsQuery.data"
    :is-open="isOpen"
    :labels="labelsQuery.data.value?.map((label) => label.name) || []"
    @on-close="isOpen = false"
  />
</template>
