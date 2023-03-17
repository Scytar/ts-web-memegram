// eslint-disable-next-line
import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss';
import { IEditingOrCreatingOptionsModalProps, ISingleConversationParticipant } from './chat-interfaces';
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
  setChatDashboardState }: IEditingOrCreatingOptionsModalProps): JSX.Element {

  const [chatNameState, setChatNameState] = useState(currentEditingOrCreatingOptionsModalChatName);

  const [participantsState, setParticipantsState] = useState(currentEditingOrCreatingOptionsModalParticipants)

  useEffect(() => {
    setChatNameState(currentEditingOrCreatingOptionsModalChatName);
    setParticipantsState(currentEditingOrCreatingOptionsModalParticipants);
  }, [currentEditingOrCreatingOptionsModalChatId])

  useEffect(() => {
    console.log('participantsState', participantsState);
  }, [participantsState])

  const addUserToChatRef = useRef((e: any): void => handleAddUserToChat(e))

  const handleAddUserToChat = (e?: any): void => {
    e?.preventDefault();
    // Listen for onchange key 'Enter'
    const newParticipantsList = participantsState;
    const participant = {
      userId: '' + Math.random(),
      username: '' + Math.random(),
    }
    newParticipantsList?.push(participant);
    setParticipantsState(newParticipantsList); // TODO: why not updating?
    console.log('newParticipantsList', newParticipantsList);
  }

  const handleDeleteUserFromChat = (e: any): void => {
    console.log('User deleted');
  }

  const handleConfirmChanges = (e: any): void => {
    handleCloseEditOrCreateConversationModal();
    console.log('Confirmed');
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


        <input
          className={styles.editChatInput}
          onChange={(e): void => setChatNameState(e.target.value)}
          type="text" value={`${chatNameState}`} />
        <div className={styles.editChatAddParticipantContainer} >
          <input
            className={styles.editChatInput}
            type="text" placeholder="Adicionar Participante"
            onKeyDown={(e): void => addUserToChatRef.current(e)} />
          <svg
            onClick={(e): void => { addUserToChatRef.current(e) }}
            className={styles.addParticipantButton} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PersonAddIcon">
            <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
          </svg>
        </div>

        <div className={styles.participantDisplayContainer} >
          {participantsState ?
            participantsState.map((item: ISingleConversationParticipant): JSX.Element => {
              return (
                <div key={item.userId} className={styles.participantDisplay} >
                  <p>{item.username}</p>
                  <PersonRemoveIcon
                    className={styles.removeParticipantButton}
                    onClick={(e): void => handleDeleteUserFromChat(e)} />
                </div>
              )
            }) :
            null
          }
        </div>
        <button 
        className={styles.editModalConfirmButton}
        onClick={(e): void => handleConfirmChanges(e)} >
          {currentEditingOrCreatingOptionsModalChatId ? 'Confirmar' : 'Criar'}
        </button>
      </div>
    </div>
  )
}
