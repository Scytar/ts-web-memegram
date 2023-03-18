// eslint-disable-next-line
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ISingleConversationObject } from './chat-interfaces'
import styles from './styles.module.scss'
// eslint-disable-next-line
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { UserContext } from '../../../contexts/userInfo';

// eslint-disable-next-line
export default function SingleConversation({ handleDeselectConversation, chatName, chatRoles, chatId, participants, messages }: ISingleConversationObject): JSX.Element {


  useEffect(() => {
    
      console.log('SingleConversationRendered')
  
    return () => {
      console.log('SingleConversationUnmounted')
    }
  }, [])
  

  const userInfoContext = useContext(UserContext);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [fetchData, setFetchData] = useState({})

  const [chatMessageText, setChatMessageText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setChatMessageText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      const myBody = {
        userId: userInfoContext.userId,
        user: userInfoContext.user,
        chatId: chatId,
        comment: chatMessageText,
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
      // setChatMessageText('')
    }
  }

  const handleSendMessage = () => {
    console.log('send message');
  };

  const request = (_options: any): void => {
    setFetchData('loading');
    // eslint-disable-next-line
    console.log('Sent!', _options.body)

    fetch('http://localhost:3030/api/comment', _options)
      .then(res => res.json())
      .then((data) => {
        setFetchData(data);
      })
      .catch((e) => {
        setFetchData('error');
        // eslint-disable-next-line
        console.log(e);
      })
  }


  return (
    <div className={styles.singleChatContainer}>
      <div className={styles.topLabelContainer}>
        <div className={styles.leftChatLabelDiv}>
          <KeyboardBackspaceIcon className={styles.chatBackButton} onClick={() => { handleDeselectConversation() }} />
          <p>{chatName}</p>
        </div>
        <div className={styles.rightChatLabelDiv}></div>
      </div>
      {/* {chatId}
      {chatRoles?.owner}	
      {participants.map((participant) => {
        return (
          <div key={participant.userId}>
            <p>{participant.username}</p>
          </div>
        )
      })
      } */}
      <div className={styles.chatActiveContainer}>
        {messages.map((message) => {
          if (userInfoContext.user === message.username) {
            return (
              <div className={styles.myChatContainer} key={message.messageId}>
                <p>{JSON.stringify(message.timestamp)}</p>
                <p className={styles.myChatBubble} >{message.message}</p>
              </div>
            )
          } else {
            return (
              <div className={styles.otherChatContainer} key={message.messageId}>
                <p className={styles.otherUserLabel} >{message.username}</p>
                <p>{JSON.stringify(message.timestamp)}</p>
                <p className={styles.otherChatBubble} >{message.message}</p>
              </div>
            )
          }
        })
        }
      </div>
      <div className={styles.bottomChatInputs}>
        <textarea
          placeholder='Escreva...'
          onChange={(e): void => handleChange(e)}
          onKeyDown={(e): void => handleKeyDown(e)}
          className={
            fetchData === 'loading' ? styles.isLoading :
              fetchData === 'error' ? styles.isError : styles.mainTextInput
          }
          value={
            fetchData === 'loading' ? 'Enviando...'
              : fetchData === 'error' ? 'Erro ao enviar!' : chatMessageText
          }
          disabled={fetchData === 'error' || fetchData === 'loading' ? true : false}
        />
        <button
          className={styles.sendChatButton}
          onClick={() => { handleSendMessage() }}>
          <SendRoundedIcon className={styles.singleSendComponent} />
        </button>
      </div>
    </div>
  )
}
