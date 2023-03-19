import { Dispatch, SetStateAction, useState } from 'react';
import styles from './styles.module.scss'


const LoginPage = ({ setUserInfo: setUserInfo }: { setUserInfo: Dispatch<SetStateAction<{ token: string | null; user: string | null; userId: string | null; }>> }): JSX.Element => {

    const [fetchStatus, setFetchStatus] = useState('ok');

    const [isLoginPage, setIsLoginPage] = useState(true);

    const [username, setUsername] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handlePageSwap = (e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();
        setIsLoginPage(!isLoginPage);
        fetchStatus != 'ok' ? setFetchStatus('ok') : null;
    };

    const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(e.target.value);
        fetchStatus != 'ok' ? setFetchStatus('ok') : null;
    };

    const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
        fetchStatus != 'ok' ? setFetchStatus('ok') : null;
    };

    const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
        fetchStatus != 'ok' ? setFetchStatus('ok') : null;
    };

    const handlePasswordConfirmInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPasswordConfirm(e.target.value);
        fetchStatus != 'ok' ? setFetchStatus('ok') : null;
    };

    const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();

        // Login input checks
        if (email.length < 4) {
            setFetchStatus('error')
            alert('E-mail precisa ter pelo menos 4 letras!')
            return
        }

        if (password.length < 4) {
            setFetchStatus('error')
            alert('Senha precisa ter pelo menos 4 letras!')
            return
        }

        const body = {
            email: email,
            password: password,
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }

        setFetchStatus('loading')
        fetch(`http://localhost:3030/api/login/0`, options)
            .then((res) => {
                if (res.status === 200) return res.json();
                throw res;
            })
            .then((data): void => {
                setUserInfo(data.userInfo)
                console.log('data', data.userInfo)
                setFetchStatus('ok')
            })
            .catch((error: any): void => {
                setFetchStatus('error')
                console.log('Error:', error)
                error.status != 401 ?
                    alert('Erro ao enviar/receber informações de acesso') :
                    (email === '' || password === '') ? 
                    null : alert('Credenciais incorretas')
            })

    };

    const handleSignUpClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();

        // SignUp input checks
        if (username.length < 4) {
            setFetchStatus('error')
            alert('Nome precisa ter pelo menos 4 letras!')
            return
        }

        if (email.length < 4) {
            setFetchStatus('error')
            alert('E-mail precisa ter pelo menos 4 letras!')
            return
        }

        if (password.length < 4) {
            setFetchStatus('error')
            alert('Senha precisa ter pelo menos 4 letras!')
            return
        }
        
        if (password !== passwordConfirm) {
            setFetchStatus('error')
            alert('Repita a senha corretamente')
            return
        }

        const body = {
            username: username,
            email: email,
            password: password,
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }

        setFetchStatus('loading')
        fetch(`http://localhost:3030/api/signup`, options)
            .then((res) => {
                if (res.status === 200) return res.json();
                throw res;
            })
            .then((data): void => {
                setUserInfo(data.userInfo)
                console.log('data', data.userInfo)
                setFetchStatus('ok')
            })
            .catch((error: any): void => {
                setFetchStatus('error')
                console.log('Error:', error)
                alert('Erro ao enviar/receber informações de acesso');
            })
    };

    const checkEmailValidity = (email: string): boolean => {      
        // check if name has any special characters, allowing spaces but dont allow more than one space in a row
        const regex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ /         
        if (!regex.test(email)) return false  
        else{
          return true
        }
    }

    const checkPasswordValidity = (password: string): boolean => {      
        // check if password have at least 4 characters and if its equal to the previously written password
        if (password.length < 4) return false
        if (password !== passwordConfirm) {
            setNotificationError('Repita a senha corretamente')
            return false      
        }
        else{
            return true
        }
    }

    return (
        <div className={styles.loginPage}>
            <form className={styles.loginContainer}>
                {isLoginPage ?
                    <>
                        <div className={styles.inputDiv}>
                            <h1 className={styles.title}>Memegram</h1>
                            <p>Entrar com uma conta</p>
                            <input type='email' placeholder='E-mail'
                                onChange={handleEmailInputChange}
                                value={email}
                            />
                            <input type='password' placeholder='Senha'
                                onChange={handlePasswordInputChange}
                                value={password}
                            />
                            <button
                                className={fetchStatus == 'ok' ? styles.okButton :
                                    fetchStatus == 'loading' ? styles.loadingButton : styles.errorButton
                                }
                                onClick={handleLoginClick}
                                disabled={fetchStatus == 'ok' ? false : true}>
                                {fetchStatus == 'ok' ? 'Entrar' :
                                    fetchStatus == 'loading' ? 'Enviando...' : 'Erro!'
                                }
                            </button>
                        </div>
                        <a onClick={handlePageSwap}>Criar conta</a>
                    </>
                    :
                    <>
                        <div className={styles.inputDiv}>
                            <h1 className={styles.title}>Memegram</h1>
                            <p>Cadastre-se para ver memes e conversar com seus amigos!</p>
                            <input type='text' placeholder='Nome'
                                onChange={handleNameInputChange}
                                value={username} />
                            <input type='email' placeholder='E-mail'
                                onChange={handleEmailInputChange}
                                value={email} />
                            <input type='password' placeholder='Senha'
                                onChange={handlePasswordInputChange}
                                value={password} />
                            <input type='password' placeholder='Repita a senha'
                                onChange={handlePasswordConfirmInputChange}
                                value={passwordConfirm} />
                            <span>Ao se cadastrar, você concorda com nossos <a>Termos</a></span>
                            <button
                                className={fetchStatus == 'ok' ? styles.okButton :
                                    fetchStatus == 'loading' ? styles.loadingButton : styles.errorButton
                                }
                                onClick={handleSignUpClick}
                                disabled={fetchStatus == 'ok' ? false : true}>
                                {fetchStatus == 'ok' ? 'Cadastre-se' :
                                    fetchStatus == 'loading' ? 'Enviando...' : 'Erro!'
                                }
                            </button>
                        </div>
                        <a onClick={handlePageSwap}>Já possuo uma conta. Entrar!</a>
                    </>
                }
            </form>
        </div>
    )
}

export { LoginPage };