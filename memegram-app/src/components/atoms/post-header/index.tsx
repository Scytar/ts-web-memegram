import { CardHeader } from '@mui/material'
import { IPostProps } from '../../organisms'

// export interface IPostHeaderProps {
//   title: string
//   subheader: Date
//   className?: string
// }

const PostHeader = (postInfo: IPostProps ): JSX.Element => {

  const dateFromServer: Date = new Date(postInfo.timestamp)

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }
  
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  }

  const datePart = dateFromServer.toLocaleString('en-GB', dateOptions);
  const timePart = dateFromServer.toLocaleTimeString('en-GB', timeOptions);

  const dateToDisplay = `${timePart} - ${datePart}`;

  return <CardHeader title={postInfo.author} subheader={dateToDisplay} />
}

export { PostHeader }
