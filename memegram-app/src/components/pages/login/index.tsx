import { useState } from 'react';
import styles from './styles.module.scss'


const LoginPage = (): JSX.Element => {

        // eslint-disable-next-line
    const [isLoginPage, setIsLoginPage] = useState(true);

        // eslint-disable-next-line
    const [username, setUsername] = useState('');

        // eslint-disable-next-line
    const [email, setEmail] = useState('');

        // eslint-disable-next-line
    const [password, setPassword] = useState('');
        
        // eslint-disable-next-line
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handlePageSwap = (e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();
        setIsLoginPage(!isLoginPage);
    };

    const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(e.target.value);
    };

    const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };
    
    const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPasswordConfirm(e.target.value);
    };
    
    const handlePasswordConfirmInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(e.target.value);
    };

    const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        //TODO: create query to Authentication API route
    };
    
    const handleSignUpClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        //TODO: create query to create user API route
    };

    return (
        <div className={styles.loginPage}>
            <form className={styles.loginContainer}>
                {isLoginPage?
                <>
                <div className={styles.inputDiv}>
                    <h1 className={styles.title}>Memegram</h1>
                    <p>Entrar com uma conta</p>
                    <input onChange={handleEmailInputChange} type='email' placeholder='E-mail'/>
                    <input onChange={handlePasswordInputChange} type='password' placeholder='Senha'/>
                    <button onClick={handleLoginClick}>Entrar</button>
                </div>
                <a onClick={handlePageSwap}>Criar conta</a>
                </>
                :
                <>
                <div className={styles.inputDiv}>
                    <h1 className={styles.title}>Memegram</h1>
                    <p>Cadastre-se para ver memes e conversar com seus amigos!</p>
                    <input onChange={handleNameInputChange} type='text' placeholder='Nome' />
                    <input onChange={handleEmailInputChange} type='email' placeholder='E-mail'/>
                    <input onChange={handlePasswordInputChange} type='password' placeholder='Senha'/>
                    <input onChange={handlePasswordConfirmInputChange} type='password' placeholder='Repita a senha'/>
                    <span>Ao se cadastrar, você concorda com nossos <a>Termos</a></span>
                    <button onClick={handleSignUpClick}>Cadastre-se</button>
                </div>
                <a onClick={handlePageSwap}>Já possuo uma conta. Entrar!</a>
                </>
                }
            </form>
        </div>
    )
}

export { LoginPage };