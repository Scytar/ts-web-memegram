import { LogoutModal } from '../../organisms/logout-modal';
import styles from './styles.module.scss'

const LogoutPage = ({handleLogout: handleLogout}: {handleLogout: () => void}): JSX.Element => {
    return (
        <div className={styles.logoutPageContainer} >
            <LogoutModal handleLogout={handleLogout} />
        </div>
    )
}

export {LogoutPage};