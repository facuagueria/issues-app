<script setup lang="ts">
import { useRoute } from 'vue-router';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import IssueCard from 'src/issues/components/issue-list/IssueCard.vue';
import useIssue from 'src/issues/composables/useIssue';

const route = useRoute();

const { issueQuery, issueCommentsQuery } = useIssue(Number(route.params.id));
</script>

<template>
  <div>
    <router-link to="/" class="text-white">Go Back</router-link>

    <LoaderSpinner v-if="issueQuery.isLoading.value" color="white" />
    <IssueCard
      v-else-if="issueQuery.data.value"
      :issue="issueQuery.data.value"
    />
    <p v-else>Issue with ID {{ route.params.id }} not found</p>

    <LoaderSpinner v-if="issueCommentsQuery.isLoading.value" color="white" />

    <div v-else class="column">
      <span class="text-h3 q-mb-md">
        Comments ({{ issueCommentsQuery.data.value?.length }})
      </span>
      <IssueCard
        v-for="comment of issueCommentsQuery.data.value"
        :key="comment"
        :issue="comment"
      />
    </div>
  </div>
</template>
