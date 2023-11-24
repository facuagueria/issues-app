import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { githubApi } from 'src/api/githubApi';
import { Label } from 'src/issues/interfaces/label';
import { useIssuesStore } from 'src/stores/issues';

const useLabels = () => {
  const issuesStore = useIssuesStore();

  const getLabels = async (): Promise<Label[]> => {
    const { data } = await githubApi<Label[]>('/labels?per_page=100');
    return data;
  };

  const labelsQuery = useQuery(['labels'], getLabels, {
    staleTime: 1000 * 60 * 60,
  });

  return {
    labelsQuery,

    //Getters
    selectedLabels: computed(() => issuesStore.labels),

    // Methods
    toggleLabel: issuesStore.toggleLabel,
  };
};

export default useLabels;
