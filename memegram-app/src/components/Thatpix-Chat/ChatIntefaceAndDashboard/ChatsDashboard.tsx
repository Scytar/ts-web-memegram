
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */

import React, { useState, useRef, useEffect, useContext } from 'react';
import ActiveConversationsDisplay from './ActiveConversationsDisplay';
import SingleConversation from './SingleConversation';
import EditingOrCreatingOptionsModal from './EditingOptionsModal';
import styles from './styles.module.scss';
import gsap from 'gsap';
import useChatWebsocket from '../useChatWebsocket';
import { IChatDashboardState } from './chat-interfaces';
import { ISingleConversationParticipant } from './chat-interfaces';
import { UserContext } from '../../../contexts/userInfo';
import { useNotificationContext } from '../../../contexts/Notifications/NotificationContext';

export default function ChatsDashboard(): JSX.Element {

  const UserInfo = useContext(UserContext);

  const { notify } = useNotificationContext();

  // This custom hook below is in charge of connecting to the websocket related to the chat
  // it also automatically close the connection when the component is unmounted  
  const { websocketReceivedState } = useChatWebsocket()

  const [chatDashboardState, setChatDashboardState] = useState<IChatDashboardState>({
    notificationsInQueue: [],
    isEditingOrCreatingOptionsModalOpen: false,
    currentEditingOrCreatingOptionsModal: {
      chatId: null,
      chatName: null,
      chatRoles: { owner: '' },
      participants: [],
    },
    queueOfChangesForServerUpdatingOfInformation: {
      chatId: null,  // if the chatId is set to 0 the chat will be created.
      chatName: null,
      chatRoles: { owner: '' },
      participants: [] // if empthy will delete the chat
    },
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

  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////
  // handlers to be used by EditingOptionsModal

  const unfuckTheState = (fuckedState: any): any => {
    // unbindscompletely the state or object and returns a JSON
    // very useful when there is object internal binding that is causing problems
    // for example, pushing an item in an array and then seeing that same item appearing in another array
    // this function is used to avoid that problem
    return JSON.parse(JSON.stringify(fuckedState))
  }

  const updateTheTemporaryQueueToBeSentToTheServer = (): void => {
    // this functions is designed to be executed inside a useEffect on the first time the 
    // EditingOptionsModal is rendered
    // it will take the data from the currently loaded chat and update the temporary queue
    // to be sent to the server possibly in the future

    const temporaryState = unfuckTheState(chatDashboardState);
    temporaryState.queueOfChangesForServerUpdatingOfInformation = unfuckTheState(temporaryState.currentEditingOrCreatingOptionsModal);
    setChatDashboardState(temporaryState);
  }

  const addNewPossibleParticipantToChatInTheTemporaryQueueToBeSentToTheServer = (participant: ISingleConversationParticipant): void => {
    // the dashboard state is the responsible for keeping track of the changes that the user is making
    // that will ultimately lead to the server to update the information in the database
    // this function takes in consideration that once the editing component is rendered the
    // dashboard state will reflect the current chatID, current chatName, current chatRoles and current participants
    // this function will change the dashboard queue of changes state to be sent to the server
    // this function will be activated everytime the user clicks to add a new participant

    // eslint-disable-next-line
    let temporaryState = { ...chatDashboardState }
    temporaryState.queueOfChangesForServerUpdatingOfInformation.participants.push(participant)
    setChatDashboardState(temporaryState)
  }

  const removeParticipantFromChatInTheTemporaryQueueToBeSentToTheServer = (participant: ISingleConversationParticipant): void => {
    // eslint-disable-next-line
    let temporaryState = { ...chatDashboardState }
    // Look for the username match that the owner wants to remove
    for (let index = 0; index < temporaryState.queueOfChangesForServerUpdatingOfInformation.participants.length; index++) {
      const element = temporaryState.queueOfChangesForServerUpdatingOfInformation.participants[index];
      if (element.username === participant.username) {
        temporaryState.queueOfChangesForServerUpdatingOfInformation.participants.splice(index, 1);
      }
    }
    setChatDashboardState(temporaryState);
  }


  const sendTheTemporaryQueueToBeSentToTheServer = (): void => {
    // this function will be executed when the user clicks on the save button
    // it will send the temporary queue to the server
    // the server will then update the database and send back the new information
    // the new information will be used to update the dashboard state
    // the dashboard state will then be used to update the information on the screen
    // the temporary queue will be reset to its initial state
    // the editing component will be closed


    const body = { //Body to be sent
      userId: UserInfo.userId as string,
      chatId: chatDashboardState.queueOfChangesForServerUpdatingOfInformation.chatId as string,
      chatName: chatDashboardState.queueOfChangesForServerUpdatingOfInformation.chatName as string,
      chatRoles: chatDashboardState.queueOfChangesForServerUpdatingOfInformation.chatRoles as { owner: string },
      participants: chatDashboardState.queueOfChangesForServerUpdatingOfInformation.participants as { userId: string, username: string }[],
    }

    fetch('/api/chats/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 200) {
          notify({
            id: JSON.stringify('chatUpdate' + Date.now() + Math.random()),
            message: `Chat ${body.chatName} atualizado com sucesso! 👍`,
            type: 'success',
            duration: 'short',
          })
          handleCloseEditOrCreateConversationModal();
        }
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('Error:', error);
        notify({
          id: JSON.stringify('chatUpdate' + Date.now() + Math.random()),
          message: 'Erro ao atualizar chat! 😵‍💫',
          type: 'error',
          duration: 'long',
        })
      }
      );
  }

  // end of handlers to be used by EditingOptionsModals
  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////

  const handleSelectConversation = (conversationId: string): void => {
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
        duration: 0.4, translateX: 0, ease: 'sine.out',
        onStart: () => {
          isAnimationInProgress.current = true
        },
        onComplete: () => {
          isAnimationInProgress.current = false
        }
      })
    }
  }, [chatDashboardState.isConversationOpen])

  const handleDeleteConversation = (chatId: string, chatName: string, chatRoles: { owner: string }): void => {

    const body = { //Body to be sent
      userId: UserInfo.userId as string,
      chatId: chatId as string,
      chatName: chatName,
      chatRoles: chatRoles as { owner: string },
    }

    fetch('/api/chats/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 200) {
          notify({
            id: JSON.stringify('chatDelete' + Date.now() + Math.random()),
            message: `Chat ${body.chatName} foi excluído para sempre 😭`,
            type: 'info',
            duration: 'long',
          })
        } else {
          notify({
            id: JSON.stringify('chatDelete' + Date.now() + Math.random()),
            message: `Erro ao excluir o chat! 😵‍💫`,
            type: 'error',
            duration: 'long',
          })
        }
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('Error:', error);
        notify({
          id: JSON.stringify('chatDelete' + Date.now() + Math.random()),
          message: 'Erro ao excluir o chat! 😵‍💫',
          type: 'error',
          duration: 'long',
        })
      })
  }

  const handleOpenEditOrCreateConversationModal = (chatId: string, chatName: string, chatRoles: {
    owner: string,
  }, participants: ISingleConversationParticipant[]): void => {
    // handler that will be passed to the ActiveConversationsDisplay component
    // to be able to open the EditingOrCreatingOptionsModal when the user clicks on the edit button
    // not supposed to be able to execute in the middle of animations
    if (!isAnimationInProgress.current) {
      const temporaryState = { ...chatDashboardState }
      temporaryState.isEditingOrCreatingOptionsModalOpen = true
      temporaryState.currentEditingOrCreatingOptionsModal.chatId = chatId
      temporaryState.currentEditingOrCreatingOptionsModal.chatName = chatName
      temporaryState.currentEditingOrCreatingOptionsModal.chatRoles = chatRoles
      temporaryState.currentEditingOrCreatingOptionsModal.participants = participants
      setChatDashboardState(temporaryState)
      gsap.to(editingOrCreatingOptionsModal.current, {
        duration: 0.4, translateX: 0, ease: 'sine.out',
        onStart: () => {
          isAnimationInProgress.current = true
        },
        onComplete: () => {
          isAnimationInProgress.current = false
        }
      })

    }
  }

  const handleCloseEditOrCreateConversationModal = (): void => {
    // handler that will be passed to the EditingOrCreatingOptionsModal component
    // to be able to close the EditingOrCreatingOptionsModal when the user clicks on the close button
    // not supposed to be able to execute in the middle of animations
    if (!isAnimationInProgress.current) {
      const temporaryState = { ...chatDashboardState }
      temporaryState.isEditingOrCreatingOptionsModalOpen = false
      temporaryState.currentEditingOrCreatingOptionsModal.chatId = null
      temporaryState.currentEditingOrCreatingOptionsModal.chatName = null
      temporaryState.currentEditingOrCreatingOptionsModal.chatRoles = { owner: 'null' }
      temporaryState.currentEditingOrCreatingOptionsModal.participants = []
      temporaryState.queueOfChangesForServerUpdatingOfInformation.chatId = null
      temporaryState.queueOfChangesForServerUpdatingOfInformation.chatName = null
      temporaryState.queueOfChangesForServerUpdatingOfInformation.chatRoles = { owner: '' }
      temporaryState.queueOfChangesForServerUpdatingOfInformation.participants = []
      gsap.to(editingOrCreatingOptionsModal.current, {
        duration: 0.4, translateX: '100%', ease: 'power2.out',
        onStart: () => {
          isAnimationInProgress.current = true
        },
        onComplete: () => {
          isAnimationInProgress.current = false
          setChatDashboardState(temporaryState)
        }
      })
    }
  }


  const handleDeselectConversation = (): void => {
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
          duration: 0.4, translateX: '-100%', ease: 'power2.out',
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


  // // eslint-disable-next-line
  // const handleEditOrCreateConversation = (chatId: string): void => {
  //   // eslint-disable-next-line
  //   console.log('editConversation')
  // }





  return (
    <div className={styles.chatDashboardParent}>
      {/* {<p>{JSON.stringify(chatDashboardState)}</p>} */}
      {/* This is the loading screen/component that will be displayed when the websocket is not connected */}
      {!websocketReceivedState ? <div>Loading...</div> : null}

      {/* This modal below is the modal that will open when a user clicks giving the sign it wants to edit a conversation group */}

      <div className={styles.editModalMasterParentThatReceivesGSAP}
        ref={editingOrCreatingOptionsModal}>
        {chatDashboardState.isEditingOrCreatingOptionsModalOpen &&
          <EditingOrCreatingOptionsModal
            currentEditingOrCreatingOptionsModalChatId={chatDashboardState.currentEditingOrCreatingOptionsModal.chatId}
            currentEditingOrCreatingOptionsModalChatName={chatDashboardState.currentEditingOrCreatingOptionsModal.chatName}
            currentEditingOrCreatingOptionsModalChatRoles={chatDashboardState.currentEditingOrCreatingOptionsModal.chatRoles}
            currentEditingOrCreatingOptionsModalParticipants={chatDashboardState.currentEditingOrCreatingOptionsModal.participants}
            queueOfChangesForServerUpdatingOfInformation={chatDashboardState.queueOfChangesForServerUpdatingOfInformation}
            handleCloseEditOrCreateConversationModal={handleCloseEditOrCreateConversationModal}
            updateTheTemporaryQueueToBeSentToTheServer={updateTheTemporaryQueueToBeSentToTheServer}
            addNewPossibleParticipantToChatInTheTemporaryQueueToBeSentToTheServer={addNewPossibleParticipantToChatInTheTemporaryQueueToBeSentToTheServer}
            removeParticipantFromChatInTheTemporaryQueueToBeSentToTheServer={removeParticipantFromChatInTheTemporaryQueueToBeSentToTheServer}
            sendTheTemporaryQueueToBeSentToTheServer={sendTheTemporaryQueueToBeSentToTheServer}
            setChatDashboardState={setChatDashboardState}
            chatDashboardState={chatDashboardState}
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
