import styles from './styles.module.scss';


export interface ICommentProps {
  key: number
  author: string
  comment: string
}

const Comment = ({ author, comment }: ICommentProps): JSX.Element => {
  return (
    <div className={styles.commentContainer}>
        <span><b>{author}</b> - {comment} </span>
    </div>
  ) 
}

export { Comment };