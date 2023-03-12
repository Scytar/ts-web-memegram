import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { useState } from 'react'
import { IconButton } from '@mui/material'
// import { useRequestLikePost } from '../../../customHooks/useRequestFeedFromApi'

// eslint-disable-next-line
const LikeButton = ({ postId }: {postId: string}): JSX.Element => {
  const [liked, setLiked] = useState(false)

  const handleLikeClick = (): void => {
    setLiked(!liked)
    //TODO: Add request to server know there's a like change in the post
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
