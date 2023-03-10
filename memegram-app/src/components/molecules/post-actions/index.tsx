import CardActions from '@mui/material/CardActions';



import { CommentButton, LikeButton, ExpandButton, Counter } from '../../atoms';


export interface IPostActionsProps {
  handleExpandClick: () => void
  expanded: boolean
  likeCounts: number
  commentCounts: number
}

const PostActions = ({
  handleExpandClick,
  expanded,
  likeCounts,
  commentCounts,
}: IPostActionsProps): JSX.Element => {
  return (
    <CardActions disableSpacing>
      <LikeButton />
      <Counter count={likeCounts} />
      <CommentButton handleExpandClick={handleExpandClick} />
      <Counter count={commentCounts} />
      <ExpandButton expanded={expanded} handleExpandClick={handleExpandClick} />
    </CardActions>
  )
}

export { PostActions }