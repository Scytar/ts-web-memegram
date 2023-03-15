import { CardContent, Collapse } from '@mui/material';
import { Comment, CommentInput } from '../../atoms';
import { IPostProps } from '../../organisms';

export interface IPostCommentsProps {
  postInfo: IPostProps,
  expanded: boolean,
}

const PostComments = ({
  postInfo,
  expanded,
}: IPostCommentsProps): JSX.Element => {
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        {postInfo.comments.map(item => {
          return (
            <Comment
              key={item.commentId}
              commentId={item.commentId}
              author={item.author}
              comment={item.comment}
            />
          )
        })}
        <CommentInput postInfo={postInfo}/>
      </CardContent>
    </Collapse>
  )
}

export { PostComments }
