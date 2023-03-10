import { CardMedia } from '@mui/material';
import styles from './styles.module.scss';

export interface IPostMediaProps{
  image: string
}

const PostMedia = ({ image }: IPostMediaProps): JSX.Element => {
  return (
    <CardMedia className={styles.postMedia} component="img" image={image} />
  )
}

export { PostMedia }