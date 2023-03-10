import { useState } from 'react'
import Card from '@mui/material/Card'
import { PostHeader, PostMedia, ICommentProps } from '../../atoms'
import { PostActions, PostComments } from '../../molecules'

export interface IPostProps {
  key: number
  authorId: number
  author: string
  timestamp: Date
  media: string
  likes: [userId: number]
  comments: ICommentProps[]
}

const Post = (props: IPostProps): JSX.Element => {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = (): void => {
    setExpanded(!expanded)
    //TODO: Add request for more comments
  }

  return (
    <Card sx={{ maxWidth: '470px' }}>
      <PostHeader title={props.author} subheader={props.timestamp} />
      <PostMedia image={props.media} />
      <PostActions
        expanded={expanded}
        handleExpandClick={handleExpandClick}
        likeCounts={props.likes.length}
        commentCounts={props.comments.length}
      />
      <PostComments commentsFromServer={props.comments} expanded={expanded} />
    </Card>
  )
}

export { Post };
