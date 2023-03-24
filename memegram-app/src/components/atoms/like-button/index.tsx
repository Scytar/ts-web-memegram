import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useState, useRef, useContext, useEffect } from 'react';
import { IconButton } from '@mui/material';
import likeUp from '../../../gsap/likeAnimations/likeUp';
import likeDown from '../../../gsap/likeAnimations/likeDown';
import styles from './styles.module.scss';
import { UserContext } from '../../../contexts/userInfo';

export interface IPostLikeProps {
  postId: string,
  postLikes: string[],
}

// eslint-disable-next-line
const LikeButton = ({ postId, postLikes }: IPostLikeProps): JSX.Element => {

  const buttonRef = useRef(null)
  const filledLikeButtonRef = useRef(null)
  const notFilledLikeButtonRef = useRef(null)

  const refsToBeAnimated = [buttonRef, notFilledLikeButtonRef, filledLikeButtonRef,]

  const userInfo = useContext(UserContext);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (userInfo.userId) {
      const bool = postLikes.includes(userInfo.userId)
      bool ?
        likeUp(refsToBeAnimated, liked, setLiked) :
        likeDown(refsToBeAnimated, liked, setLiked)
    }
  }, [])


  const [isInCooldown, setIsInCooldown] = useState(false);
  // eslint-disable-next-line
  const likeUpRef = useRef((): void => { });
  // eslint-disable-next-line
  const likeDownRef = useRef((): void => { });

  const handleLike = (): void => {
    if (!isInCooldown) {
      setIsInCooldown(true);

      setTimeout(() => {
        setIsInCooldown(false);
      }, 2000);

      likeUpRef.current();
    }
  }

  const handleUnlike = (): void => {
    if (!isInCooldown) {
      setIsInCooldown(true);

      setTimeout(() => {
        setIsInCooldown(false);
      }, 2000);

      likeDownRef.current();
    }
  }

  likeUpRef.current = (): void => {
    likeUp(refsToBeAnimated, liked, setLiked);
    request();
  }
  likeDownRef.current = (): void => {
    likeDown(refsToBeAnimated, liked, setLiked);
    request();
  }

  const request = (): void => {
    const body = {
      like: !liked,
      postId: postId,
      userId: userInfo.userId,
    }

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }

    fetch('/api/like', options);
  }

  const handleLikeClick = (): void => {
    if (liked) {
      handleUnlike()
    } else {
      handleLike()
    }
  }

  return (
    <div ref={buttonRef}>
      <IconButton onClick={handleLikeClick} aria-label="like">

        <div className={styles.buttonDiv}>
          <div ref={filledLikeButtonRef} className={styles.upLike}><Favorite color='error' /></div >
          <div ref={notFilledLikeButtonRef} className={styles.downLike}><FavoriteBorder /></div>
        </div>

      </IconButton>
    </div>
  )
}

export { LikeButton }
