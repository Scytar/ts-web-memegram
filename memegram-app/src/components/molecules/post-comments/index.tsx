import { CardContent, Collapse } from '@mui/material'

import { Comment, CommentInput, ICommentProps } from '../../atoms'

const PostComments = (
  commentsFromServer: ICommentProps[],
  expanded: boolean
): JSX.Element => {
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        {commentsFromServer.map(item => {
          return (
            <Comment
              key={item.key}
              author={item.author}
              comment={item.comment}
            />
          )
        })}
        <CommentInput />
      </CardContent>
    </Collapse>
  )
}

export { PostComments }
