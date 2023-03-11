import { useState } from 'react'
import Card from '@mui/material/Card'
import { PostHeader, PostMedia, ICommentProps } from '../../atoms'
import { PostActions, PostComments } from '../../molecules'

export interface IPostProps {
  key: string
  authorId: string
  author: string
  timestamp: Date
  media: string
  likes: string[]
  comments: ICommentProps[]
}

const Post = (props: {props:IPostProps}): JSX.Element => {

  const postElement: IPostProps = props.props;

  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = (): void => {
    setExpanded(!expanded)
    //TODO: Add request for more comments
  }

  return (
    <Card sx={{ maxWidth: '470px' }}>
      <PostHeader title={postElement.author} subheader={postElement.timestamp} />
      <PostMedia image={postElement.media} />
      <PostActions
        postId={postElement.key}
        expanded={expanded}
        handleExpandClick={handleExpandClick}
        likeCounts={postElement.likes.length}
        commentCounts={postElement.comments.length}
      />
      <PostComments commentsFromServer={postElement.comments} expanded={expanded} />
    </Card>
  )
}

export { Post };
