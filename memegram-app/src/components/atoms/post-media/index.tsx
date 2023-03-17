import { CardMedia } from '@mui/material';
import styles from './styles.module.scss';
// import MockMedia from '../../../imgs/fancy-garden.jpeg'
import { IPostProps } from '../../organisms';

// export interface IPostMediaProps{
//   image: string
// }

const PostMedia = (postInfo: IPostProps): JSX.Element => {

  // eslint-disable-next-line
  const mediaToDisplay = `/${postInfo.media}` //TODO: fetch media properly

  return (
    <div className={styles.postMedia}>
      <CardMedia className={styles.postMedia} component="img" image={mediaToDisplay} />
    </div>
  )
}

export { PostMedia };