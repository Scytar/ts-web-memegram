import { useEffect } from 'react'
// import { Post } from '../../organisms/post';
// import { IPostProps } from '../../organisms/post';
import { useRequestFeedItemsFromApi } from '../../../customHooks/useRequestFeedFromApi';
import { PostSkeleton } from '../../skeletons/post';
// import { useQuery } from 'react-query';

const MemegramFeed = (
  //TODO: receive IPostProps[]
): JSX.Element => {


  // This feed is the main feed that will be displayed on the page
  // it will be a list of all the feed items rendered as multiples of the Post component

  // below is the code that will be used to fetch the feed items from the database

  const { data, isLoading, isError } = useRequestFeedItemsFromApi();

  // below is the code that will log the items in the console once loaded

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line
      console.log(data);
    }
  }, []);

  //This is how we should render the elements
  //   <div>
  //     {isLoading ? <PostSkeleton/> : null}
  //     {isError ? <><p>Error fetching feed items</p><PostSkeleton/></> : null}
  //     {data 
  //     ? 
  //     data.feedItems.map(
  //     (feedItem) => 
  //     <FeedSingleItem key={feedItem.key} feedItem={feedItem} 
  //     />) : null
  //     }
  //  </div>

//   interface queryResponse {
//     data: unknown,
//     isLoading: boolean,
//     isError: boolean,
// }

  return (
    <>
      {isLoading ? <PostSkeleton/> : null}
      {isError ? <><p>Error fetching feed items</p><PostSkeleton/></> : null}
      {data?
        <p>Success!</p> : null
        // data.map(
        //   (item: IPostProps) => {
        //     return <Post props={item} />
        //   }
        // )
      }
    </>
  )
}

export { MemegramFeed }