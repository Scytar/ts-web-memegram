import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { Dispatch, SetStateAction, useState } from 'react'
import { IconButton } from '@mui/material'
import { IPostProps } from '../../organisms'
// import { useRequestLikePost } from '../../../customHooks/useRequestFeedFromApi'

// eslint-disable-next-line
const LikeButton = ({ postId, setPostInfo }: {postId: string, setPostInfo: Dispatch<SetStateAction<IPostProps>>}): JSX.Element => {
  const [liked, setLiked] = useState(false)

  const handleLikeClick = (): void => {
    setLiked(!liked);
    // TODO: handle postInfo local update
    //setPostInfo();

    // TODO: Add request to server know there's a like change in the post
    // const body = {
    //   like: liked,
    //   postId: postId,
    // }
    // const { data , isLoading, isError } = useRequestLikePost(body);
    
  }
  
  return (
    <IconButton onClick={handleLikeClick} aria-label="like">
      {liked ? <Favorite/> : <FavoriteBorder />}
    </IconButton>
  )
}

export { LikeButton }
