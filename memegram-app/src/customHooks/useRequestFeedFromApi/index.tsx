import { useQuery } from 'react-query';
import { IPostProps } from '../../components/organisms';


interface IQueryResponse {
    data: {feedItems: IPostProps[]},
    isLoading: boolean,
    isError: boolean,
}

interface ILikeRequestBody {
  userId: string,
  postId: string,
}

function useRequestFeedItemsFromApi(): IQueryResponse {
  const { data, isLoading, isError } = useQuery('feedItems', () =>
    fetch('http://localhost:3030/api/feedItems').then((res) => res.json())
  );
  return { data, isLoading, isError };
}

const useRequestLikePost = (_body: ILikeRequestBody): IQueryResponse => {
  const options = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(_body),
  };

  const { data, isLoading, isError } = useQuery('feedItems', () => 
    fetch('http://localhost:3030/api/like-post', options).then((res) => res.json())
  );
  return { data, isLoading, isError};
}

export { useRequestFeedItemsFromApi , useRequestLikePost };