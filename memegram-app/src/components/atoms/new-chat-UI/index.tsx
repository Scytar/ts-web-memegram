import { useContext } from 'react';
import { UserContext } from '../../../contexts/userInfo';
import { ISingleConversationParticipant } from '../../Thatpix-Chat/ChatIntefaceAndDashboard/chat-interfaces';
import styles from './styles.module.scss'

const NewChat = ({ handler: handleOpenEditOrCreateConversationModal }: { handler: (chatId: string, chatName: string, chatRoles: { owner: string, }, participants: ISingleConversationParticipant[]) => void }): JSX.Element => {

    const UserInfo = useContext(UserContext)

    return (
        <div
            className={styles.newChatOptionContainer}
            onClick={
                () => handleOpenEditOrCreateConversationModal(
                    '0',
                    '',
                    { owner: UserInfo.userId as string },
                    [{ userId: UserInfo.userId as string, username: UserInfo.user as string, },])} >
            <p>Nova Conversa</p>
            <svg className={styles.newChatIcon} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z" />
            </svg>
        </div>
    )
}

export { NewChat };