import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { githubApi } from 'src/api/githubApi';
import { Issue } from 'src/issues/interfaces/issue';

interface Args {
  title: string;
  labels?: string[];
  body?: string;
}

const addIssue = async ({
  title,
  body = '',
  labels = [],
}: Args): Promise<Issue> => {
  const newIssueData = {
    title,
    body,
    labels,
  };

  const { data } = await githubApi.post<Issue>('/issues', newIssueData);

  return data;
};

const useIssueMutation = () => {
  const queryClient = useQueryClient();
  const issueMutation = useMutation(addIssue, {
    onSuccess: (issue) => {
      // Cuando termina con success
      queryClient.invalidateQueries({ queryKey: ['issues'], exact: false });

      queryClient.refetchQueries(['issues'], { exact: false });

      queryClient.setQueryData(['issue', issue.number], issue);
    },
    onSettled: () => {
      // Cuando termina con error o success
    },
  });
  return {
    issueMutation,
  };
};

export default useIssueMutation;
