import { useRef } from 'react'

import styles from './styles.module.scss'

const CommentInput = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any): void => {
    e.preventDefault()
    //Send comment to the server
  }

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (): void => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        onChange={handleChange}
        className={styles.commentInput}
        placeholder="Adicionar um comentário..."
      />
    </form>
  )
}

export { CommentInput }
