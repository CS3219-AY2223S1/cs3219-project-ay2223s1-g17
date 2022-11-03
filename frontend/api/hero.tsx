import { Statistics } from 'components/Hero/Hero';
import { SERVICE, HTTP_METHOD } from 'utils/enums';
import { apiCall } from 'utils/helpers';
import { useQuery } from '@tanstack/react-query';
import { History } from 'components/Hero/CompletionPanel/CompletionPanel';
import { reactQueryConfig } from './config';

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
