import { useQuery } from '@tanstack/vue-query';
import { Issue, State } from 'src/issues/interfaces/issue';
import { githubApi } from 'src/api/githubApi';
import useStore from 'src/issues/composables/useStore';

const getIssues = async (labels: string[], state: State): Promise<Issue[]> => {
  const params = new URLSearchParams();

  if (state) params.append('state', state);
  if (labels.length > 0) params.append('labels', labels.join(','));

  params.append('per_page', '10');

  const { data } = await githubApi.get<Issue[]>('/issues', { params });

  return data;
};

const useIssues = () => {
  const { labels, state } = useStore();
  // const issuesStore = useIssuesStore();
  // const { labels, state } = storeToRefs(issuesStore);

  const issuesQuery = useQuery(['issues', { labels, state }], () =>
    getIssues(labels.value, state.value)
  );

  return {
    issuesQuery,
  };
};

export default useIssues;
