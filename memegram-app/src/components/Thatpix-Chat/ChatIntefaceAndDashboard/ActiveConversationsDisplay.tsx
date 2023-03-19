
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */

import React from 'react'
import styles from './styles.module.scss';
import { IActiveConversationsDisplayProps } from './chat-interfaces';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function ActiveConversationsDisplay({
    handleOpenEditOrCreateConversationModal,
    handleDeleteConversation,
    handleSelectConversation,
    data,
    chatDashboardState,
    setChatDashboardState }: IActiveConversationsDisplayProps): JSX.Element | null {

    const handleConversationClick = (chatId: string): void => {

        // This handler affect the dashboard state of the parent component through updates
        // the default values on the parent component are:
        // isConversationOpen: false,
        // currentActiveConversationId: null,

        // After the click the parent state is updated which should trigger 2 things:
        // 1. The parent component should allow the child component to render showing the conversation
        // 2. The parent component should feed the child component with the conversationId or 
        // the conversation data to be displayed

        handleSelectConversation(chatId)
        // eslint-disable-next-line

    }

    return (
        <>
            <h2>Chats</h2>
            {
                data && data.map((conversation: any) => {
                    return (
                        <div
                            className={styles.chatLabelSingleContainer}
                            key={conversation.chatId}
                            onClick={(): void => { handleConversationClick(conversation.chatId) }} >
                            <>
                                {/* <div>Chat Id:{conversation.chatId}</div> */}
                                <div className={styles.chatLabelName}>{conversation.chatName}</div>
                                {/* <div>Owner:{conversation.chatRoles.owner}</div> */}
                            </>
                            <div className={styles.chatLabelOptionsContainer}>
                                <SettingsIcon
                                    className={styles.chatOptionsIcon}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenEditOrCreateConversationModal(
                                            conversation.chatId,
                                            conversation.chatName,
                                            conversation.chatRoles,
                                            conversation.participants,
                                        )
                                    }} />
                                <DeleteForeverIcon
                                    className={styles.chatOptionsIcon}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteConversation(conversation.chatId)
                                    }} />
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}
