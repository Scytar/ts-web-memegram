import { useEffect, useState } from 'react';
import { Post } from '../../organisms/post';
import { IPostProps } from '../../organisms/post';
import { PostSkeleton } from '../../skeletons/post';
import styles from './styles.module.scss'

// This feed is the main feed that will be displayed on the page
// it will be a list of all the feed items rendered as multiples of the Post component

const MemegramFeed = (): JSX.Element => {

  const globalFeedSocketUrl = 'ws://' + window.location.hostname + '/globalFeed';

  // eslint-disable-next-line
  const [feedState, setfeedState] = useState(null as IPostProps[] | any | null)

  // eslint-disable-next-line
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  // useEffect(() => {
  //   if (feedState) {
  //     console.log('feedState', feedState)
  //   }
  // }, [feedState])

  // eslint-disable-next-line
  function handleWebSocketConnection(ws: WebSocket): void {
    // eslint-disable-next-line
    console.log('Feed WebSocket connection established');

    ws.addEventListener('message', function (event: MessageEvent) {
      //TODO: refactor ws.message response to only send a specific post data, not the entire feed.
      const dataFromSocket = JSON.parse(event.data);

      setfeedState(dataFromSocket);
    });

    ws.addEventListener('close', function () {
      // eslint-disable-next-line
      console.log('Feed WebSocket connection closed');
    });
  }  

  useEffect(() => {
    if (!webSocket) {
      const ws = new WebSocket(globalFeedSocketUrl);
      setWebSocket(ws);
    } else {
      handleWebSocketConnection(webSocket);
    }

    return () => {
      webSocket?.close();
    }
  }, [webSocket]);

  const isLoading = false;
  const isError = false;

  return (
    <div className={styles.feedContainer} >
      {isLoading ? <><PostSkeleton /><PostSkeleton /></> : null}
      {isError ? <><p>Erro ao requisitar feed</p><PostSkeleton /></> : null}
      {feedState ?
        feedState.map(
          (item: IPostProps) => {
            return <Post
              key={item.postId}
              postId={item.postId}
              authorId={item.authorId}
              author={item.author}
              timestamp={item.timestamp}
              media={item.media}
              likes={item.likes}
              comments={item.comments}
            />
          }
        ) : null
      }
      <PostSkeleton />
      <PostSkeleton />
    </div>
  )
}

export { MemegramFeed }