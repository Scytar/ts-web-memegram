import { Post } from '../../organisms/post';
import { IPostProps } from '../../organisms/post';
import { PostSkeleton } from '../../skeletons/post';

  // This feed is the main feed that will be displayed on the page
  // it will be a list of all the feed items rendered as multiples of the Post component

const MemegramFeed = ({feedItems}: {feedItems: IPostProps[]}): JSX.Element => {

  //Fetch data from API and store relevant data
  // const { data, isLoading, isError } = useRequestFeedItemsFromApi();

  // //Log data once loaded
  // useEffect(() => {
  //   if (data) {
  //     // eslint-disable-next-line
  //     console.log(data);
  //   }
  // }, [data]);

  const isLoading = false;
  const isError = false;

  return (
    <>
      {isLoading ? <><PostSkeleton/><PostSkeleton/></> : null}
      {isError ? <><p>Erro ao requisitar feed</p><PostSkeleton/></> : null}
      {feedItems ?
        feedItems.map(
          (item: IPostProps) => {
            return <Post key={item.postId} {...item} />
          }
        ) : null
      }
    </>
  )
}

export { MemegramFeed }