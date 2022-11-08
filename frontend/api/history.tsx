import { useQuery } from '@tanstack/react-query';
import { History } from 'components/Hero/CompletionPanel/CompletionPanel';
import { Question } from 'contexts/MatchingContext';
import { SERVICE, HTTP_METHOD } from 'utils/enums';
import { apiCall } from 'utils/helpers';
import { reactQueryConfig } from './config';

export type CompleteHistory = Omit<History, 'question'> & {
  question: Question;
};

export const useCodingSession = (id?: string) => {
  const queryKey = ['codingSession'];

  const queryFn = async (id?: string): Promise<CompleteHistory | undefined> => {
    if (!id) return;

    const completeHistory = await apiCall({
      service: SERVICE.HISTORY,
      method: HTTP_METHOD.GET,
      path: `/complete/${id}`,
    });

    return completeHistory;
  };

  return useQuery(queryKey, () => queryFn(id), reactQueryConfig);
};
