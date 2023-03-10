import { CardHeader } from '@mui/material'

export interface IPostHeaderProps {
  title: string
  subheader: Date
  className?: string
}

const PostHeader = ({
  title,
  subheader
}: IPostHeaderProps ): JSX.Element => {
  return <CardHeader title={title} subheader={subheader.toString()} />
}

export { PostHeader }
