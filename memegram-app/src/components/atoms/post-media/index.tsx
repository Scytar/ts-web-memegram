import { CardMedia } from '@mui/material';
import styles from './styles.module.scss';
import MockMedia from '../../../imgs/fancy-garden.jpeg'

export interface IPostMediaProps{
  image: string
}

const PostMedia = ({ image }: IPostMediaProps): JSX.Element => {

  // eslint-disable-next-line
  const mediaToDisplay = `../../../imgs/${image}` //TODO: fetch media properly

  return (
    <CardMedia className={styles.postMedia} component="img" image={MockMedia} />
  )
}

export { PostMedia }