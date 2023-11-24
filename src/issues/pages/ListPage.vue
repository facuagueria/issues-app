<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import FilterSelector from 'src/issues/components/filter-selector/FilterSelector.vue';
import IssueList from 'src/issues/components/issue-list/IssueList.vue';
import useIssues from 'src/issues/composables/useIssues.ts';

const { issuesQuery } = useIssues();
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
</template>
