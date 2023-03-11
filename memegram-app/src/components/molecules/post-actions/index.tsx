import CardActions from '@mui/material/CardActions';



import { CommentButton, LikeButton, ExpandButton, Counter } from '../../atoms';


export interface IPostActionsProps {
  postId: string
  handleExpandClick: () => void
  expanded: boolean
  likeCounts: number
  commentCounts: number
}

const PostActions = ({
  postId,
  handleExpandClick,
  expanded,
  likeCounts,
  commentCounts,
}: IPostActionsProps): JSX.Element => {
  return (
    <CardActions disableSpacing>
      <LikeButton postId={postId} />
      <Counter count={likeCounts} />
      <CommentButton handleExpandClick={handleExpandClick} />
      <Counter count={commentCounts} />
      <ExpandButton expanded={expanded} handleExpandClick={handleExpandClick} />
    </CardActions>
  )
}

export { PostActions }