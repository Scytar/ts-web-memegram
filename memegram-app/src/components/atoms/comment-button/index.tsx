import { ChatBubbleOutline } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export interface ICommentButtonProps {
  handleExpandClick?: () => void
}

const CommentButton = ({
  handleExpandClick,
}: ICommentButtonProps): JSX.Element => {
  return (
    <IconButton onClick={handleExpandClick} aria-label="comment">
      <ChatBubbleOutline />
    </IconButton>
  )
}

export { CommentButton }
