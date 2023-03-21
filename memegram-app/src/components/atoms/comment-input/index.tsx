import { useContext, useRef, useState } from 'react';
import { IPostProps } from '../../organisms';
import { UserContext } from '../../../contexts/userInfo';
import { useNotificationContext } from '../../../contexts/Notifications/NotificationContext';
import styles from './styles.module.scss';

const CommentInput = ({postInfo}: {postInfo: IPostProps}): JSX.Element => {

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [commentContent, setCommentContent] = useState('');

  const { notify } = useNotificationContext();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setCommentContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }
  
  // useQuery states
      // eslint-disable-next-line
  const [fetchData, setFetchData] = useState({});
  
  // eslint-disable-next-line
  const request = (_options: any): void => {
    setFetchData('loading');

    fetch('/api/comment', _options)
      .then(res => res.json())
      .then((data) => {
        setFetchData(data);
      })
      .catch(() => {
        setFetchData('error');
        notify({
          id: JSON.stringify('comment' + Date.now() + Math.random()),
          message: "Erro ao enviar comentário ao servidor",
          type: 'error',
          duration: 'short',
        })
      })
  }

  const userInfo = useContext(UserContext);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();    

      const myBody = {
        user: userInfo.user,
        postId: postInfo.postId,
        comment: commentContent,
      };

      const options = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myBody)
      }

      request(options);

      e.currentTarget.value = '';
      setCommentContent('')
    }
  }

  return (
    <form className={styles.commentContainer}>
      <textarea
        ref={textareaRef}
        value={
          fetchData === 'loading' ? 'Enviando...'
            : fetchData === 'error' ? 'Erro ao enviar comentário!' : commentContent
        }
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={
          fetchData === 'loading' ? styles.isLoading
            : fetchData === 'error' ? styles.isError : styles.commentInput
        }
        placeholder={"Adicionar um comentário..."}
        disabled={fetchData === 'error' || fetchData === 'loading' ? true : false}
      />
    </form>
  )
}

export { CommentInput };
