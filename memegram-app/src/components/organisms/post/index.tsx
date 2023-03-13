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

  const [postState, setPostState] = useState(postInfo)

  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = (): void => {
    setExpanded(!expanded)
    //TODO: Add request for more comments
  }

  return (
    <Card sx={{ maxWidth: '470px' }}>
      <PostHeader {...postState} />
      <PostMedia {...postState} />
      <PostActions
        postInfo={postState}
        setPostInfo={setPostState}
        handleExpandClick={handleExpandClick}
        expanded={expanded}
      />
      <PostComments postInfo={postState} setPostInfo={setPostState} expanded={expanded} />
    </Card>
  )
}

export { Post };
