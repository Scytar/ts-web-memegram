import { useState, useEffect, useRef } from 'react';
import { MemegramFeed } from '../../components/templates';
import { Navbar } from '../../components/templates/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import style from './app.module.scss'
import { LoginPage } from '../../components/pages/login';
import { NewPostModal } from '../../components/templates/new-post-modal';
import MemegramIcon from '../../imgs/memegram-logo-circle.webp'
import { UserContext } from '../../contexts/userInfo';
import { useQuery } from 'react-query';
import ChatPage from '../../components/pages/chat/index';
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { LogoutPage } from '../../components/pages/logout';
import { NotificationContextProvider } from '../../contexts/Notifications/NotificationContext';

const App = (): JSX.Element => {

    const PageTransitionComponent = (): JSX.Element => {
        // use gsap to animate the page transition
        const location = useLocation()
        const tlRef = useRef(gsap.timeline())
        const transitionDivRef = useRef(null)


        useEffect(() => {
            tlRef.current.fromTo(transitionDivRef.current, { opacity: 0 }, { opacity: 1, duration: 0 })
            tlRef.current.fromTo(transitionDivRef.current, { opacity: 1 }, { opacity: 0, duration: 0.5 })
        }, [location])

        return (
            <div ref={transitionDivRef} className={style.pageTransitionEnter}>
            </div>)
    }


    // eslint-disable-next-line
    const [UserInfo, setUserInfo] = useState({
        token: '987654321' as string | null,
        user: null as string | null,
        userId: null as string | null,
    })

    // {
    //     token: '987654321',
    //     user: 'TestUser',
    //     userId: '123', 
    // }

    useEffect(() => {
        // eslint-disable-next-line
        console.log('UserInfo',UserInfo)

    }, [UserInfo])

    
    const loginFetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(UserInfo)
    }

    // Authenticate session
    //TODO: create a singleton for this fetch
    const { data, isLoading, isError } = useQuery('userInfo', () => 
        fetch('http://localhost:3030/api/login/' + UserInfo.token, loginFetchOptions)
            .then((res) => {
                return res.json();
            })
            ,
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchInterval: false,
            refetchIntervalInBackground: false,
        }
    )

    const handleLogout = (): void => {
        setUserInfo({
            token: null,
            user: null,
            userId: null,
        });
        window.history.back();
        // TODO: uncomment this after authentication flow is completed
        // window.history.pushState(null,'','/')
        // window.history.go();
    }

    useEffect(() => {
        if (data && !isLoading && !isError) {
            setUserInfo(data.userInfo)
        }

    }, [data]);


    return (
        <div className={style.appDiv}>
            <NotificationContextProvider>
            <UserContext.Provider value={UserInfo}>
                <BrowserRouter>
                    {isLoading ?
                        <img className={style.placeholder} src={MemegramIcon} />
                        :
                        UserInfo?.userId ?
                            <>
                                <Navbar />
                                <PageTransitionComponent />
                                <Routes>
                                    {/* TODO: Create all pages components */}
                                    <Route path='/' element={<MemegramFeed />} />
                                    <Route path='/chats' element={<ChatPage />} />
                                    <Route path='/new-post' element={<NewPostModal />} />
                                    <Route path='/logout' element={<LogoutPage handleLogout={handleLogout} />} />
                                    <Route path='*' element={<><h2>404 Not Found</h2><img className={style.placeholder} src={MemegramIcon} /></>} />
                                </Routes>
                            </>
                            : <>
                                <LoginPage setUserInfo={setUserInfo}/>
                            </>}
                </BrowserRouter>
            </UserContext.Provider>
            </NotificationContextProvider>
        </div>
    )
}

export default App
