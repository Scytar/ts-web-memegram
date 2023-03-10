import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { useState } from 'react'
import { IconButton } from '@mui/material'


const LikeButton = (): JSX.Element => {
  const [liked, setLiked] = useState(false)

  const handleLikeClick = (): void => {
    setLiked(!liked)
    //TODO: Add request to server know there's a like change in the post
  }
  
  return (
    <IconButton onClick={handleLikeClick} aria-label="like">
      {liked ? <Favorite/> : <FavoriteBorder />}
    </IconButton>
  )
}

export { LikeButton }
