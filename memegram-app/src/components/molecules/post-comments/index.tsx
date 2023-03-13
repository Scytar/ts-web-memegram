import { CardContent, Collapse } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Comment, CommentInput } from '../../atoms';
import { IPostProps } from '../../organisms';

export interface IPostCommentsProps {
  postInfo: IPostProps,
  setPostInfo: Dispatch<SetStateAction<IPostProps>>,
  expanded: boolean,
}

const PostComments = ({
  postInfo,
  setPostInfo,
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
        <CommentInput postInfo={postInfo} setPostInfo={setPostInfo}/>
      </CardContent>
    </Collapse>
  )
}

export { PostComments }
