
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */

import React, { useState, useRef, useEffect } from 'react';
import ActiveConversationsDisplay from './ActiveConversationsDisplay';
import SingleConversation from './SingleConversation';
// import gsap from 'gsap'
import NotificationModal from './NotificationModal';
import EditingOrCreatingOptionsModal from './EditingOptionsModal';
import styles from './styles.module.scss';
import gsap from 'gsap';
import useChatWebsocket from '../useChatWebsocket';
import { IChatDashboardState } from './chat-interfaces';
import { ISingleConversationParticipant } from './chat-interfaces';

export default function ChatsDashboard(): JSX.Element {

  // This custom hook below is in charge of connecting to the websocket related to the chat
  // it also automatically close the connection when the component is unmounted  
  const { websocketReceivedState } = useChatWebsocket()

  const [chatDashboardState, setChatDashboardState] = useState<IChatDashboardState>({
    notificationsInQueue: [],
    isEditingOrCreatingOptionsModalOpen: false,
    currentEditingOrCreatingOptionsModalChatId: null,
    currentEditingOrCreatingOptionsModalChatName: null,
    currentEditingOrCreatingOptionsModalChatRoles: { owner: null },
    currentEditingOrCreatingOptionsModalParticipants: [],
    isConversationOpen: false,
    currentActiveConversationId: null,
  })

  // This is a ref that will be used to check if an animation is in progress
  // this is important because if an animation is in progress then the user
  // should not be able to open another conversation
  const isAnimationInProgress = useRef(false)

  // Those are the refs of the components that will be animated
  const editingOrCreatingOptionsModal = useRef(null)
  const activeConversationsDisplay = useRef(null)
  const singleConversation = useRef(null)


  const handleSelectConversation = (conversationId: string) => {
    // handler that will be passed to the ActiveConversationsDisplay component
    // to be able to open a conversation when the user clicks on it
    // not supposed to be able to execute in the middle of animations
    if (!isAnimationInProgress.current) {
      const temporaryState = { ...chatDashboardState }
      temporaryState.isConversationOpen = true
      temporaryState.currentActiveConversationId = conversationId
      setChatDashboardState(temporaryState)
    }
  }

  useEffect(() => {
    // this useEffect is being used as a listener to the state of the chatDashboardState
    // if the state isConversationOpen is true then the singleConversation component will be animated
    // having the singleConversation component coming from out of screen to be in front of the screen

    if (chatDashboardState.isConversationOpen) {
      gsap.to(singleConversation.current, {
        duration: 0.4, translateX:0, ease: 'sine.out',
        onStart: () => {
          isAnimationInProgress.current = true
        },
        onComplete: () => {
          isAnimationInProgress.current = false
        }
      })
    }
  }, [chatDashboardState.isConversationOpen])

 
  const handleDeselectConversation = () => {
    // handler that will be passed to the SingleConversation component
    // to be able to close a conversation when the user clicks on the close button
    // different from the handleSelectConversation this handler will not need a listener
    // not supposed to be able to execute in the middle of animations
    if (!isAnimationInProgress.current) {
      const temporaryState = { ...chatDashboardState }
      temporaryState.isConversationOpen = false
      temporaryState.currentActiveConversationId = null
      gsap.to(singleConversation.current,
        {
          duration: 0.4, translateX:'-100%', ease: 'power2.out',
          onStart: () => {
            isAnimationInProgress.current = true
          },
          onComplete: () => {
            setChatDashboardState(temporaryState)
            isAnimationInProgress.current = false
          }
        }
      )
    }
  }

  const handleDeleteConversation = (chatId: string) => {
    console.log('deleteConversation')
  }

  const handleOpenEditOrCreateConversationModal = (chatId: string,  chatName: string, chatRoles: {
    owner: string,}, participants: ISingleConversationParticipant[]) => {
    // handler that will be passed to the ActiveConversationsDisplay component
    // to be able to open the EditingOrCreatingOptionsModal when the user clicks on the edit button
    // not supposed to be able to execute in the middle of animations
    if(!isAnimationInProgress.current) {
        const temporaryState = { ...chatDashboardState }    
        temporaryState.isEditingOrCreatingOptionsModalOpen = true
        temporaryState.currentEditingOrCreatingOptionsModalChatId = chatId
        temporaryState.currentEditingOrCreatingOptionsModalChatName = chatName
        temporaryState.currentEditingOrCreatingOptionsModalChatRoles = chatRoles
        temporaryState.currentEditingOrCreatingOptionsModalParticipants = participants
        setChatDashboardState(temporaryState)   
        gsap.to(editingOrCreatingOptionsModal.current, {
            duration: 0.4, translateX:0, ease: 'sine.out',
            onStart: () => {
                isAnimationInProgress.current = true         
            },
            onComplete: () => {
                isAnimationInProgress.current = false            
            }
        })
        setChatDashboardState(temporaryState)
    }
}

const handleCloseEditOrCreateConversationModal = () => {
    // handler that will be passed to the EditingOrCreatingOptionsModal component
    // to be able to close the EditingOrCreatingOptionsModal when the user clicks on the close button
    // not supposed to be able to execute in the middle of animations
    if(!isAnimationInProgress.current) {
        const temporaryState = { ...chatDashboardState }        
        gsap.to(editingOrCreatingOptionsModal.current, {
            duration: 0.4, translateX:'100%', ease: 'power2.out',
            onStart: () => {            
                isAnimationInProgress.current = true
            },
            onComplete: () => {
                temporaryState.isEditingOrCreatingOptionsModalOpen = false
                temporaryState.currentEditingOrCreatingOptionsModalChatId = null         
                temporaryState.currentEditingOrCreatingOptionsModalChatName = null
                temporaryState.currentEditingOrCreatingOptionsModalChatRoles = {owner: null}
                temporaryState.currentEditingOrCreatingOptionsModalParticipants = []
                isAnimationInProgress.current = false
                setChatDashboardState(temporaryState)
            }
        }) 
    }
}


  const handleEditOrCreateConversation = (chatId: string) => {
    console.log('editConversation')
  }





  return (
    <div className={styles.chatDashboardParent}>
      {/* This is the loading screen/component that will be displayed when the websocket is not connected */}
      {!websocketReceivedState ? <div>Loading...</div> : null}

      {/* Notification Modal is here just as a further development suggestion */}

      {
        chatDashboardState.notificationsInQueue.length > 0 &&
        <NotificationModal
          notificationsInQueue={chatDashboardState.notificationsInQueue}
          setChatDashboardState={setChatDashboardState}
        />
      }

      {/* This modal below is the modal that will open when a user clicks giving the sign it wants to edit a conversation group */}

      <div ref={editingOrCreatingOptionsModal}>
          {chatDashboardState.isEditingOrCreatingOptionsModalOpen &&         
            <EditingOrCreatingOptionsModal  
              currentEditingOrCreatingOptionsModalChatId={chatDashboardState.currentEditingOrCreatingOptionsModalChatId}
              currentEditingOrCreatingOptionsModalChatName={chatDashboardState.currentEditingOrCreatingOptionsModalChatName}
              currentEditingOrCreatingOptionsModalChatRoles={chatDashboardState.currentEditingOrCreatingOptionsModalChatRoles}
              currentEditingOrCreatingOptionsModalParticipants={chatDashboardState.currentEditingOrCreatingOptionsModalParticipants}
              handleCloseEditOrCreateConversationModal={handleCloseEditOrCreateConversationModal}
              setChatDashboardState={setChatDashboardState}
            />       
             }
      </div> 
      {/* This is the main component that will display all modals and components relevant for the chat */}

      <>
        {/* This is the component that will display all the active conversations 
        By clicking on any of the options in it the user will be able to open a conversation and see the messages in it */}
        <div ref={activeConversationsDisplay} className={`${styles.chatListContainer}`}>
          <ActiveConversationsDisplay
            data={websocketReceivedState}
            chatDashboardState={chatDashboardState}
            setChatDashboardState={setChatDashboardState}
            handleSelectConversation={handleSelectConversation}
            handleDeleteConversation={handleDeleteConversation}
            handleOpenEditOrCreateConversationModal={handleOpenEditOrCreateConversationModal}
          />
        </div>
        {/* This is the component that will display a single conversation 
        This component will also have the power to send messages to the server to be added in this particular conversation */}

        <div ref={singleConversation} className={styles.currentChatContainer}>
          {chatDashboardState.isConversationOpen &&
            websocketReceivedState && chatDashboardState.currentActiveConversationId ?
            websocketReceivedState.map((conversation: any) => {
              if (conversation.chatId === chatDashboardState.currentActiveConversationId) {
                return (
                  <div key={conversation.chatId}>
                    <SingleConversation
                      chatId={conversation.chatId}
                      chatRoles={conversation.chatRoles}
                      messages={conversation.messages}
                      chatName={conversation.chatName}
                      participants={conversation.participants}
                      handleDeselectConversation={handleDeselectConversation}
                    />
                  </div>
                )
              }

            }
            ) : null}
        </div>
      </>

    </div>
  )
}
