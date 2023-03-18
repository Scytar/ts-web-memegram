// eslint-disable-next-line
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import styles from './styles.module.scss';
import { IChatDashboardState, IEditingOrCreatingOptionsModalProps, ISingleConversationParticipant } from './chat-interfaces';
import CloseIcon from '@mui/icons-material/Close';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


// eslint-disable-next-line
export default function EditingOrCreatingOptionsModal({
  currentEditingOrCreatingOptionsModalChatId,
  currentEditingOrCreatingOptionsModalChatName,
  currentEditingOrCreatingOptionsModalChatRoles,
  currentEditingOrCreatingOptionsModalParticipants,
  handleCloseEditOrCreateConversationModal,
  queueOfChangesForServerUpdatingOfInformation,
  updateTheTemporaryQueueToBeSentToTheServer,
  addNewPossibleParticipantToChatInTheTemporaryQueueToBeSentToTheServer,
  removeParticipantFromChatInTheTemporaryQueueToBeSentToTheServer,
  sendTheTemporaryQueueToBeSentToTheServer,
  chatDashboardState,
  setChatDashboardState }: IEditingOrCreatingOptionsModalProps): JSX.Element {

  useLayoutEffect(() => {
    updateTheTemporaryQueueToBeSentToTheServer()
    console.log(`EditingOptionsModalRendered`)

    return () => {
      console.log(`EditingOptionsModalUnmounted`)
    }
  }, [])

  const [participantToBeAddedName, setParticipantToBeAddedName] = useState<string>('');
  const [chatNameToBeChanged, setChatNameToBeChanged] = useState<string>(currentEditingOrCreatingOptionsModalChatName? currentEditingOrCreatingOptionsModalChatName : '');

  const handleButtonClickToAddUser = (e: React.ChangeEvent<any>): void => {
    e.preventDefault();
    if (participantToBeAddedName != '') {
      addNewPossibleParticipantToChatInTheTemporaryQueueToBeSentToTheServer({ userId: 'toGivenByTheServer', username: participantToBeAddedName });
      setParticipantToBeAddedName('');
    } else alert('Insira o nome de um usuário!');
  }

  const handleInputAddUserWithEnterKey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key == 'Enter') {
      e.preventDefault();
      if ((e.target as HTMLInputElement).value != '') {
        addNewPossibleParticipantToChatInTheTemporaryQueueToBeSentToTheServer({ userId: 'toGivenByTheServer', username: participantToBeAddedName });
        setParticipantToBeAddedName('');
        (e.target as HTMLInputElement).value = '';
      } else alert('Insira o nome de um usuário!');
    }
  }

  return (
    <div className={styles.editChatModalParent} >
      <div className={styles.editChatModalContainer} >
        <svg className={styles.chatEditModalIcon} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ForumIcon">
          <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"></path>
        </svg>
        <CloseIcon
          className={styles.closeIconButton}
          onClick={() => { handleCloseEditOrCreateConversationModal() }} />

        <form>
          <input
            type="text" 
            className={styles.editChatInput}
            value={chatNameToBeChanged}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setChatNameToBeChanged((e.target as HTMLInputElement).value)  }}/>
        </form>

        <form className={styles.editChatAddParticipantContainer} onSubmit={(e): void => { e.preventDefault() }}>
          <input
            className={styles.editChatInput}
            type="text" placeholder="Adicionar pessoa"
            value={participantToBeAddedName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              e.preventDefault();
              e.stopPropagation();
              setParticipantToBeAddedName((e.target as HTMLInputElement).value);
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => { handleInputAddUserWithEnterKey(e) }}
          />
          <svg
            onClick={(e: React.ChangeEvent<any>): void => { handleButtonClickToAddUser(e) }}
            className={styles.addParticipantButton} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PersonAddIcon">
            <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
          </svg>
        </form>

        <div className={styles.participantDisplayContainer} >
          <>
            {currentEditingOrCreatingOptionsModalParticipants ?
              currentEditingOrCreatingOptionsModalParticipants.map((item: ISingleConversationParticipant): JSX.Element => {
                return (
                  <div key={item.userId} className={styles.participantDisplay} >
                    <p>current</p>
                    <p>{item.username}</p>
                    <PersonRemoveIcon
                      className={styles.removeParticipantButton}
                      onClick={(): void => removeParticipantFromChatInTheTemporaryQueueToBeSentToTheServer(item)} />
                  </div>
                )
              }) :
              null
            }
          </>
          <>
            {queueOfChangesForServerUpdatingOfInformation?.participants?.map((item: ISingleConversationParticipant): JSX.Element | null => {
              // if (!currentEditingOrCreatingOptionsModalParticipants) return null;
              // for (let i = 0; i < currentEditingOrCreatingOptionsModalParticipants.length; i++) { // Check for repeated
              //   const element = currentEditingOrCreatingOptionsModalParticipants[i];
              //   if (element.username == item.username) {
              //     console.log(item.username)
              //     return null;
              //   }             
              // };
              console.log('item', item.username)
              return (
                <>
                  <div key={item.username} className={styles.participantDisplay} >
                    <p>in Queue</p>
                    <p>{item.username}</p>
                    <PersonRemoveIcon
                      className={styles.removeParticipantButton}
                      onClick={(): void => { removeParticipantFromChatInTheTemporaryQueueToBeSentToTheServer(item) }}
                    />
                  </div>
                </>
              )
            })
            }

          </>
        </div>

        <button
          className={styles.editModalConfirmButton}
          onClick={(): void => { sendTheTemporaryQueueToBeSentToTheServer() }}
        >
          {currentEditingOrCreatingOptionsModalChatId ? 'Confirmar' : 'Criar'}
        </button>
      </div>
    </div>
  )
}
