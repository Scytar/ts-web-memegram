import { useQuery } from 'react-query';

interface queryResponse {
    data: unknown,
    isLoading: boolean,
    isError: boolean,
}

function useRequestFeedItemsFromApi(): queryResponse {
  const { data, isLoading, isError } = useQuery('feedItems', () =>
    fetch('/api/feedItems').then((res) => res.json())
  );
  return { data, isLoading, isError };
}

export { useRequestFeedItemsFromApi };