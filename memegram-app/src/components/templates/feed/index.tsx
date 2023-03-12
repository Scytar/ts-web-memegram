import { useEffect } from 'react'
import { Post } from '../../organisms/post';
import { IPostProps } from '../../organisms/post';
import { useRequestFeedItemsFromApi } from '../../../customHooks/useRequestFeedFromApi';
import { PostSkeleton } from '../../skeletons/post';

  // This feed is the main feed that will be displayed on the page
  // it will be a list of all the feed items rendered as multiples of the Post component

const MemegramFeed = (): JSX.Element => {

  //Fetch data from API and store relevant data
  const { data, isLoading, isError } = useRequestFeedItemsFromApi();

  //Log data once loaded
  useEffect(() => {
    if (data) {
      // eslint-disable-next-line
      console.log(data);
    }
  }, [data]);

  return (
    <>
      {isLoading ? <><PostSkeleton/><PostSkeleton/></> : null}
      {isError ? <><p>Erro ao requisitar feed</p><PostSkeleton/></> : null}
      {data?
        data.feedItems.map(
          (item: IPostProps) => {
            return <Post props={item} />
          }
        ) : null
      }
    </>
  )
}

export { MemegramFeed }