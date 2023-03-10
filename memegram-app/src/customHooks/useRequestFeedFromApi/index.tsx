import { useQuery } from 'react-query';
import { IPostProps } from '../../components/organisms';


interface queryResponse {
    data: {feedItems: IPostProps[]},
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