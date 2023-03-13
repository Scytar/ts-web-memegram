import CardActions from '@mui/material/CardActions';
import { IPostProps } from '../../organisms';
import { CommentButton, LikeButton, ExpandButton, Counter } from '../../atoms';
import { Dispatch, SetStateAction } from 'react';

export interface IPostActionsProps {
  postInfo: IPostProps,
  setPostInfo: Dispatch<SetStateAction<IPostProps>>,
  handleExpandClick: () => void,
  expanded: boolean,
}

const PostActions = ({postInfo, setPostInfo, handleExpandClick, expanded}: IPostActionsProps): JSX.Element => {
  return (
    <CardActions disableSpacing>
      <LikeButton postId={postInfo.postId} setPostInfo={setPostInfo} />
      <Counter count={postInfo.likes.length} />
      <CommentButton handleExpandClick={handleExpandClick} />
      <Counter count={postInfo.comments.length} />
      <ExpandButton expanded={expanded} handleExpandClick={handleExpandClick} />
    </CardActions>
  )
}

export { PostActions }