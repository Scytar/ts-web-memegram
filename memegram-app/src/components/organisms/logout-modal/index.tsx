import styles from './styles.module.scss'

const LogoutModal = ({ handleLogout: handleLogout }: { handleLogout: () => void }): JSX.Element => {
    return (
        <div className={styles.logoutModalContainer} >
            <p>Deseja realmente sair?</p>
            <div className={styles.buttonsContainer} >
                <button
                    className={styles.confirmButton}
                    onClick={handleLogout}
                >Sim, sair!</button>

                <button
                    className={styles.cancelButton}
                    onClick={(): void => { window.history.back() }}
                >Não, quero ficar</button>
            </div>
        </div>
    )
}

export { LogoutModal };