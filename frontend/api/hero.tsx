import { Statistics } from 'components/Hero/Hero';
import { SERVICE, HTTP_METHOD, DIFFICULTY } from 'utils/enums';
import { apiCall } from 'utils/helpers';
import { History } from 'components/Hero/CompletionPanel/CompletionPanel';
import { reactQueryConfig } from './config';
import { useQuery } from '@tanstack/react-query';

export const useHistory = (userId: string) => {
  const queryKey = ['history'];

  const queryFn = async (userId: string): Promise<History[]> => {
    const history = await apiCall({
      service: SERVICE.HISTORY,
      method: HTTP_METHOD.GET,
      path: `/history/${userId}`,
    });

    return history;
  };

  const { data, isLoading, isFetching } = useQuery(
    queryKey,
    () => queryFn(userId),
    reactQueryConfig
  );

  return {
    history: data,
    isLoadingHistory: isLoading,
    isFetchingHistory: isFetching,
  };
};

export const useQuestionsCount = () => {
  const queryKey = ['questions'];

  const queryFn = async (): Promise<Record<DIFFICULTY, number>> => {
    const questionsCount = await apiCall({
      service: SERVICE.QUESTION,
      method: HTTP_METHOD.GET,
      path: '/count/difficulty',
    });

    return questionsCount;
  };

  const { data, isLoading, isFetching } = useQuery(
    queryKey,
    () => queryFn(),
    reactQueryConfig
  );

  return {
    questionsCount: data,
    isLoadingQuestionsCount: isLoading,
    isFetchingQuestionsCount: isFetching,
  };
};

export const useStatistics = (userId: string) => {
  const queryKey = ['statistics'];

  const queryFn = async (userId: string): Promise<Statistics> => {
    const statistics = await apiCall({
      service: SERVICE.HISTORY,
      method: HTTP_METHOD.GET,
      path: `/stats/${userId}`,
    });

    return statistics;
  };

  const { data, isLoading, isFetching } = useQuery(
    queryKey,
    () => queryFn(userId),
    reactQueryConfig
  );

  return {
    statistics: data,
    isLoadingStatistics: isLoading,
    isFetchingStatistics: isFetching,
  };
};
