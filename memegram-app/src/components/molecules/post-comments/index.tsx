import { CardContent, Collapse } from '@mui/material'

import { Comment, CommentInput, ICommentProps } from '../../atoms'

export interface IPostCommentsProps {
  commentsFromServer: ICommentProps[]
  expanded: boolean
}

const PostComments = ({
  commentsFromServer,
  expanded,
}: IPostCommentsProps): JSX.Element => {
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
