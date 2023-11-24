import { storeToRefs } from 'pinia';
import { useIssuesStore } from 'stores/issues';

const useStore = () => {
  const issuesStore = useIssuesStore();
  const { labels, state } = storeToRefs(issuesStore);

  return {
    labels,
    state,
  };
};

export default useStore;
