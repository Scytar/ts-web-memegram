export interface ISingleConversationObject {
    chatId: string,
    chatName: string,
    chatRoles: {
      owner: string,
    },
    participants: ISingleConversationParticipant[],
    messages: ISingleConversationMessage[],
    handleDeselectConversation: () => void,
  }
  
  export interface ISingleConversationParticipant {
    userId: string,
    username: string,
  }
  
  export interface ISingleConversationMessage {
    messageId: string,
    username: string,
    timestamp: Date,
    message: string,
  }

  export interface IEditingOrCreatingOptionsModalProps {
    setChatDashboardState: any,
    handleCloseEditOrCreateConversationModal: () => void,
    currentEditingOrCreatingOptionsModalChatId?: string | null,
    currentEditingOrCreatingOptionsModalChatName?: string | null,
    updateTheTemporaryQueueToBeSentToTheServer: ()=>void,
    resetTheTemporaryQueueToBeSentToTheServer: ()=>void,
    addNewPossibleParticipantToChatInTheTemporaryQueueToBeSentToTheServer: (participant: ISingleConversationParticipant)=>void,
    removeParticipantFromChatInTheTemporaryQueueToBeSentToTheServer: (participant: ISingleConversationParticipant)=>void,
    sendTheTemporaryQueueToBeSentToTheServer: ()=>void,
    
    queueOfChangesForServerUpdatingOfInformation: {
      chatId: string | null,
      chatName: string | null,
      chatRoles: {
        owner: string,
      } | null,
      participants: ISingleConversationParticipant[] | null
    },
    currentEditingOrCreatingOptionsModalChatRoles?: {
      owner: string | null,
    },
    currentEditingOrCreatingOptionsModalParticipants?: ISingleConversationParticipant[],
}

export interface IActiveConversationsDisplayProps {
  data: any,
  chatDashboardState: any,
  setChatDashboardState: (any: any) => void,
  handleDeleteConversation: (conversationId: string) => void,
  handleSelectConversation: (conversationId: string) => void,
  handleOpenEditOrCreateConversationModal: (chatId: string,  chatName: string, chatRoles: {
    owner: string,}, participants: ISingleConversationParticipant[]) => void,
}

export interface IChatDashboardState {
  notificationsInQueue: unknown[],
  currentEditingOrCreatingOptionsModal: {
    chatId: string | null,
    chatName: string | null,
    chatRoles: {
      owner: string,
    },
    participants: ISingleConversationParticipant[]
  }
  isEditingOrCreatingOptionsModalOpen: boolean,
  isConversationOpen: boolean, 
  queueOfChangesForServerUpdatingOfInformation:{
    chatId: string | null,
    chatName: string | null,
    chatRoles: {
      owner: string,
    },
    participants: ISingleConversationParticipant[]
  }
  currentActiveConversationId: string | null | undefined | unknown | any | number,
}