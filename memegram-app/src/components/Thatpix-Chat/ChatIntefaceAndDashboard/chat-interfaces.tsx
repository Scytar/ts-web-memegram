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
    setChatDashboardState: unknown,
    handleCloseEditOrCreateConversationModal: () => void,
    currentEditingOrCreatingOptionsModalChatId?: string | null,
    currentEditingOrCreatingOptionsModalChatName?: string | null,
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
  currentEditingOrCreatingOptionsModalChatId:string | null,
  isEditingOrCreatingOptionsModalOpen: boolean,
  isConversationOpen: boolean,
  currentEditingOrCreatingOptionsModalChatRoles: {
    owner: string | null,
  },
  currentEditingOrCreatingOptionsModalChatName: string | null,
  currentEditingOrCreatingOptionsModalParticipants: ISingleConversationParticipant[],
  currentActiveConversationId: string | null | undefined | unknown | any | number,
}