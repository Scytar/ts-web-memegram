import { useState, useEffect } from 'react';
import { MemegramFeed } from '../../components/templates';
import { useQuery } from 'react-query';
import { Navbar } from '../../components/templates/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import style from './app.module.scss'
import { LoginPage } from '../../components/pages/login';
import { NewPostModal } from '../../components/templates/new-post-modal';
import MemegramIcon from '../../imgs/memegram-logo-circle.webp'
import { UserContext } from '../../contexts/userInfo';

const App = (): JSX.Element => {

    const [UserInfo, setUserInfo] = useState({
        token: null,
        userId: '123', //Feeds an userId for conditional rendering
    })

    // Authenticate session
    const { data, isLoading, isError } = useQuery('userInfo', () =>
        fetch('http://localhost:3030/api/userInfo')
            .then((res) => {
                return res.json();
            })
    );

    useEffect(() => {
        if (data && !isLoading && !isError) {
            setUserInfo(data.userInfo)
        }

    }, [data])


    return (
        <div id={style.appDiv}>
            <UserContext.Provider value={UserInfo}>
                <BrowserRouter>
                    {isLoading ? 
                    <img className={style.placeholder} src={MemegramIcon} />
                        : 
                        UserInfo?.userId ?
                            <>
                                <Navbar />
                                <Routes>
                                    {/* TODO: Create all pages components */}
                                    <Route path='/' element={<MemegramFeed />} />
                                    <Route path='/chats' element={<h2>Chats Page</h2>} />
                                    <Route path='/new-post' element={<NewPostModal />} />
                                    <Route path='/logout' element={<h2>Logout</h2>} />
                                    <Route path='*' element={<><h2>404 Not Found</h2><img className={style.placeholder} src={MemegramIcon} /></>} />
                                </Routes>
                            </>
                            : <>
                                <LoginPage />
                            </>}
                </BrowserRouter>
            </UserContext.Provider>
        </div>
    )
}

export default App
