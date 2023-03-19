import CardActions from '@mui/material/CardActions';
import { IPostProps } from '../../organisms';
import { CommentButton, LikeButton, ExpandButton, Counter } from '../../atoms';

export interface IPostActionsProps {
  postInfo: IPostProps,
  handleExpandClick: () => void,
  expanded: boolean,
}

const PostActions = ({
  postInfo,
  handleExpandClick,
  expanded }: IPostActionsProps): JSX.Element => {
  return (
    <CardActions disableSpacing>
      <LikeButton 
      postId={postInfo.postId}
      postLikes={postInfo.likes}  />
      <Counter count={postInfo.likes.length} />
      <CommentButton handleExpandClick={handleExpandClick} />
      <Counter count={postInfo.comments.length} />
      <ExpandButton expanded={expanded} handleExpandClick={handleExpandClick} />
    </CardActions>
  )
}

export { PostActions }