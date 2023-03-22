import { useState } from 'react'
import Card from '@mui/material/Card'
import { PostHeader, PostMedia, ICommentProps } from '../../atoms'
import { PostActions, PostComments } from '../../molecules'

export interface IPostProps {
  postId: string
  authorId: string
  author: string
  timestamp: Date
  media: string
  likes: string[]
  comments: ICommentProps[]
}

const Post = (postInfo: IPostProps): JSX.Element => {

  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = (): void => {
    setExpanded(!expanded)
  }

  return (
    <Card sx={{ maxWidth: '470px' }}>
      <PostHeader {...postInfo} />
      <PostMedia {...postInfo} /> 
      <PostActions
        postInfo={postInfo}
        handleExpandClick={handleExpandClick}
        expanded={expanded}
      /> 
      <PostComments 
      postInfo={postInfo} 
      expanded={expanded} />
    </Card>
  )
}

export { Post };
