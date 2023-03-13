import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { IPostProps } from '../../organisms';

import styles from './styles.module.scss';

export interface IPostCommentInput {
  postInfo: IPostProps,
  setPostInfo: Dispatch<SetStateAction<IPostProps>>
}

const CommentInput = ({postInfo, setPostInfo}: IPostCommentInput): JSX.Element => {

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [commentContent, setCommentContent] = useState('');

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
    // eslint-disable-next-line
    console.log('Sent!', _options.body)

    fetch('http://localhost:3030/api/comment', _options)
      .then(res => res.json())
      .then((data) => {
        setFetchData(data);
        setPostInfo(JSON.parse(data));
      })
      .catch((e) => {
        setFetchData('error');
        // eslint-disable-next-line
        console.log(e);
      })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      //TODO: send comment to API

      const myBody = {
        userId: '321',
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
