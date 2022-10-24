import { useQuery } from '@tanstack/react-query/build/lib/useQuery';
import { History, Statistics } from 'components/Hero/Hero';
import { SERVICE, HTTP_METHOD } from 'utils/enums';
import { apiCall } from 'utils/helpers';

export const useHistory = (userId: string) => {
  const queryKey = ['history'];

  const queryFn = async (userId: string): Promise<History[]> => {
    const history = await apiCall({
      service: SERVICE.HISTORY,
      method: HTTP_METHOD.POST,
      path: '/get',
      body: {
        userId,
      },
    });

    return history;
  };

  const { data, isLoading, isFetching } = useQuery(queryKey, () =>
    queryFn(userId)
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
      method: HTTP_METHOD.POST,
      path: '/stats',
      body: {
        userId,
      },
    });

    return statistics;
  };

  const { data, isLoading, isFetching } = useQuery(queryKey, () =>
    queryFn(userId)
  );

  return {
    statistics: data,
    isLoadingStatistics: isLoading,
    isFetchingStatistics: isFetching,
  };
};
