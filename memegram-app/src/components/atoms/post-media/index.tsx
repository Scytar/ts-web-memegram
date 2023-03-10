import { CardMedia } from '@mui/material'

export interface IPostMediaProps {
  className: string,
  image: string
}

const PostMedia = ({ className, image }: IPostMediaProps): JSX.Element => {
  return <CardMedia className={className} component="img" image={image} />
}

export { PostMedia }
