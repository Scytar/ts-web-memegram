import React, { useContext, useEffect, useRef, useState } from 'react'
import { ISingleConversationObject } from './chat-interfaces'
import styles from './styles.module.scss'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { UserContext } from '../../../contexts/userInfo';
import { useNotificationContext } from '../../../contexts/Notifications/NotificationContext';

// eslint-disable-next-line
export default function SingleConversation({ handleDeselectConversation, chatName, chatRoles, chatId, participants, messages }: ISingleConversationObject): JSX.Element {


  useEffect(() => {

    // console.log('SingleConversationRendered');
    (chatDiv.current as HTMLDivElement).scrollTop = (chatDiv.current as HTMLDivElement).scrollHeight;

    return () => {
      // console.log('SingleConversationUnmounted')
    }
  }, [])


  const userInfoContext = useContext(UserContext);

  const { notify } = useNotificationContext();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const chatDiv = useRef<HTMLDivElement>(null);

  const [fetchData, setFetchData] = useState('ok')

  const [chatMessageText, setChatMessageText] = useState('');

  useEffect(() => {
    (chatDiv.current as HTMLDivElement).scrollTop = (chatDiv.current as HTMLDivElement).scrollHeight;
  }, [messages])


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setChatMessageText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e);
    }
  }

  const handleSendMessage = (e: React.KeyboardEvent | React.ChangeEvent | React.MouseEvent): void => {
    if (fetchData != 'ok') return
    e.preventDefault();

    if (chatMessageText.trim() === '') {
      (textareaRef.current as HTMLTextAreaElement).value = '';
      return
    }

    const myBody = {
      userId: userInfoContext.userId,
      username: userInfoContext.user,
      chatId: chatId,
      messageText: chatMessageText.trim(),
    };

    const options = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myBody)
    }

    request(options);

    (textareaRef.current as HTMLTextAreaElement).value = '';
    (textareaRef.current as HTMLTextAreaElement).focus();
    (chatDiv.current as HTMLDivElement).scrollTop = (chatDiv.current as HTMLDivElement).scrollHeight;
    setChatMessageText('');
  };

  const request = (_options: { method: string; headers: { "Content-Type": string; }; body: string; }): void => {
    setFetchData('loading');

    fetch('http://localhost:3030/api/chat', _options)
      .then((res) => {
        // console.log('data from chat api', res)
        res.status === 200 ? setFetchData('ok') : setFetchData('error');
      })
      .catch((e) => {
        setFetchData('error');
        // eslint-disable-next-line
        console.error('error', e);
        // TODO: Add a useNotificationContext
        notify({
          id: JSON.stringify('chatMessage' + Date.now() + Math.random()),
          message: "Falha ao enviar mensagem",
          type: 'error',
          duration: 'short',
        })
      })
  }


  return (
    <div className={styles.singleChatContainer}>
      <div className={styles.topLabelContainer}>
        <div className={styles.leftChatLabelDiv}>
          <KeyboardBackspaceIcon className={styles.chatBackButton} onClick={(): void => { handleDeselectConversation() }} />
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
      <div
        ref={chatDiv}
        className={styles.chatActiveContainer} >
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
          ref={textareaRef}
          placeholder='Escreva...'
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => handleChange(e)}
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>): void => handleKeyDown(e)}
          className={
            fetchData === 'loading' ? styles.isLoadingTextInput :
              fetchData === 'error' ? styles.isErrorTextInput : styles.mainTextInput
          }
          value={
            fetchData === 'loading' ? 'Enviando...'
              : fetchData === 'error' ? 'Erro ao enviar!' : chatMessageText
          }
        // disabled={fetchData === 'error' || fetchData === 'loading' ? true : false}
        />
        <button
          className={styles.sendChatButton}
          onClick={(e): void => { handleSendMessage(e) }}
          disabled={fetchData === 'error' || fetchData === 'loading' ? true : false}
        >
          <SendRoundedIcon className={styles.singleSendComponent} />
        </button>
      </div>
    </div>
  )
}
