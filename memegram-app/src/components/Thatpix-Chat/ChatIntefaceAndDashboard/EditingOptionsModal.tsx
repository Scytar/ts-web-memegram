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
  }, [])

  const formRef1 = useRef<HTMLFormElement>(null)
  const participantToBeAddedName = useRef<string>('')
  const nameToBechangedRef = useRef<string | null>(null)
  const [sendInformationToServer, setSendInformationToServer] = useState<boolean>(false)

  const checkIfNameIsAlreadyAParticipant = (name: string): boolean => {
    // check if there is already a participant with the same name in the current participants
    let isAlreadyAParticipant = false
    currentEditingOrCreatingOptionsModalParticipants?.forEach((participant: ISingleConversationParticipant) => {
      if (participant.username.toLowerCase() == name.toLowerCase()){
         isAlreadyAParticipant = true
      }
    })
    // check if there is already a participant with the same name in the temporary queue
    queueOfChangesForServerUpdatingOfInformation?.participants?.forEach((participant:any) => {    
        if (participant.username.toLowerCase() == name.toLowerCase()){
          isAlreadyAParticipant = true
        }      
    })
    return isAlreadyAParticipant
  }

  const checkNameValidity = (name: string): boolean => {
      // check is name is less than 3 characters or bigger than 30)
      if (name.length < 3) return false
      if (name.length > 30) return false
      // check if name has any special characters, allowing spaces but dont allow more than one space in a row
      const regex = /^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/         
      if (!regex.test(name)) return false    
      if (checkIfNameIsAlreadyAParticipant(name)) return false  
      else{
        return true
      }
  }

  const checkIfTheNameToBeChangedOfTheChatIsValid = (name: string): boolean => {  
    if (name == currentEditingOrCreatingOptionsModalChatName) return false
    if (name?.length < 3 && name.length > 0) return false
    if (name?.length > 30) return false 
    else
    {
      return true
    }
}
  
  const handleInputAddUserWithEnterKey = (e: React.KeyboardEvent<HTMLInputElement>, formRef:React.RefObject<HTMLFormElement> ): void => {
    if (e.key == 'Enter') {
      e.preventDefault();
      if (checkNameValidity((e.target as HTMLInputElement).value)) {
        addNewPossibleParticipantToChatInTheTemporaryQueueToBeSentToTheServer({ userId: 'toGivenByTheServer', username: (e?.target as HTMLTextAreaElement).value });
        formRef?.current?.reset();
      } else alert('Error no nome de usuario! Escreva um nome de usuario valido!');
    }
  }  

  const handleButtonClickToAddUser = (e: React.ChangeEvent<any>, formRef:React.RefObject<HTMLFormElement> ): void => {   
    console.log(formRef)    
      e.preventDefault();
      if (checkNameValidity((formRef?.current?.children[0] as HTMLInputElement).value)) {
        addNewPossibleParticipantToChatInTheTemporaryQueueToBeSentToTheServer({ userId: 'toGivenByTheServer', username: (formRef?.current?.children[0] as HTMLInputElement).value });
        formRef?.current?.reset();
      } else alert('Error no nome de usuario! Escreva um nome de usuario valido!');   
  }

  const handleConfirmChangesOrCreation = (name:string | null): void => {
    if (checkIfTheNameToBeChangedOfTheChatIsValid(name)){
      // if the name is valid, then send the temporary queue to the server
      // for that make a unbinded copy of the state and then update that copy
      // with name on the equivalent of  queueOfChangesForServerUpdatingOfInformation.chatName
      // and then set the state with the copy      
      const temporaryState = JSON.parse(JSON.stringify(chatDashboardState))
      temporaryState.queueOfChangesForServerUpdatingOfInformation.chatName = name   
      setChatDashboardState(temporaryState)  
      setSendInformationToServer(!sendInformationToServer)      
 
    }
    else {
      alert('Error no nome do chat! Escreva um nome de chat valido!')
    }
  }

  const isFirstTimeRendering = useRef(true)

  useEffect(() => {   
    if (isFirstTimeRendering.current) {
      isFirstTimeRendering.current = false
      return
    }else{
      sendTheTemporaryQueueToBeSentToTheServer()
    }  
  }, [sendInformationToServer])
  
    


  // However, there are some issues with the implementation. The case statements inside the switch statement are using boolean expressions as case values. This is not valid syntax, and will cause a compilation error. Instead, you should use the if statement to check the conditions and return false if any of them are true. Here's a corrected version of the code:

  return (
    <div className={styles.editChatModalParent} >
    
      <div className={styles.editChatModalContainer} >   
        <p>{currentEditingOrCreatingOptionsModalChatName} </p>    
        <svg className={styles.chatEditModalIcon} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ForumIcon">
          <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"></path>
        </svg>
        <CloseIcon
          className={styles.closeIconButton}
          onClick={() => { handleCloseEditOrCreateConversationModal() }} />

        <form          
          onSubmit={(e: React.FormEvent<HTMLFormElement>): void => { e.preventDefault() }}>
          <input
            type="text"
            className={styles.editChatInput}        
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { 
              nameToBechangedRef.current= (e.target as HTMLInputElement)?.value }} 
           />
        </form>              

        <form
          ref={formRef1}
          className={styles.editChatAddParticipantContainer}
          onSubmit={(e: React.FormEvent<HTMLFormElement>): void => { e.preventDefault() }}>
          <input
            className={styles.editChatInput}
            type="text" placeholder="Adicionar pessoa"     
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => { handleInputAddUserWithEnterKey(e,formRef1) }}
          />
          <svg
            onClick={(e: React.ChangeEvent<any>): void => { handleButtonClickToAddUser(e,formRef1) }}
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
                    <p>Já participando.</p>                  
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
          <div>
            {queueOfChangesForServerUpdatingOfInformation?.participants?.map((item: ISingleConversationParticipant): JSX.Element | null => {          
              console.log('item', item.username)
              return (
                <div key={item.username} >
                 {/**  if the participant is already in the array currentEditingOrCreatingOptionsModalParticipants, then don't show it in the list of participants to be added **/}
                  {currentEditingOrCreatingOptionsModalParticipants?.find((participant: ISingleConversationParticipant) => participant.username === item.username) ? null :                                                   
                  <div className={styles.participantDisplay}>
                    <p>Para participar.</p>
                    <p>{item.username}</p>
                    <PersonRemoveIcon
                      className={styles.removeParticipantButton}
                      onClick={(): void => { removeParticipantFromChatInTheTemporaryQueueToBeSentToTheServer(item) }}
                    />
                  </div>
                  }
                </div>
              )
            })
            }

          </div>
        </div>

        <button
          className={styles.editModalConfirmButton}
          onClick={(): void => { handleConfirmChangesOrCreation(nameToBechangedRef.current) }}
        >
          {currentEditingOrCreatingOptionsModalChatId ? 'Confirmar' : 'Criar'}
        </button>
      </div>
    </div>
  )
}
