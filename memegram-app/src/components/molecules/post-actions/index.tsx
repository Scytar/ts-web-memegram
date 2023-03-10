import CardActions from '@mui/material/CardActions'

import { CommentButton, LikeButton, ExpandButton } from '../../atoms'

export interface IPostActionsProps {
  handleExpandClick: () => void
  expanded: boolean
}

const PostActions = ({
  handleExpandClick,
  expanded,
}: IPostActionsProps): JSX.Element => {
  return (
    <CardActions>
      <LikeButton />
      <CommentButton handleExpandClick={handleExpandClick} />
      <ExpandButton expanded={expanded} handleExpandClick={handleExpandClick} />
    </CardActions>
  )
}

export { PostActions }
