export interface IChatElement {
    chatId: string;
    chatName: string;
    chatRoles: { owner: string; };
    participants: {
      userId: string;
      username: string;
    }[];
    messages: {
      messageId: string;
      username: string;
      dateWithTime: string;
      message: string;
    }[];
}