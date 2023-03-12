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

  const dateFromServer: Date = new Date(subheader)

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

  return <CardHeader title={title} subheader={dateToDisplay} />
}

export { PostHeader }
