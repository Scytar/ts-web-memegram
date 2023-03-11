import { useState, useEffect , createContext } from 'react';
import { MemegramFeed } from '../../components/templates';
import { makeServer } from '../../utils/mirage/mirage';
import { useQuery } from 'react-query';
import { Navbar } from '../../components/templates/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import style from './app.module.scss'
import { PostSkeleton } from '../../components/skeletons/post';
import { LoginPage } from '../../components/pages/login';

const App = (): JSX.Element => {

    // Creates a mock server for testing using a MirageJS server
    // For more information visit https://miragejs.com/
    // This is being done by using a useEffect to start it that will turn it off if the component unmounts
    // This mock server pretends to be an actual end point and retur a Json response when called
    // TODO: remove this before deploy

    useEffect(() => {
        const server = makeServer()
        return () => {
            server.shutdown()
        }
    }, []);

    const [UserInfo, setUserInfo] = useState({
        token: null,
        userId: null,
    })

    const UserContext = createContext(UserInfo);

    // Authenticate session
    const { data, isLoading, isError } = useQuery('userInfo', () =>
        fetch('/api/userInfo').then((res) => res.json())
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
                        {isLoading? <h1>Memegram</h1>
                        : UserInfo?.userId?
                        <>
                            <Navbar/>
                            <Routes>
                                {/* TODO: Create all pages components */}
                                <Route path='/' element={<MemegramFeed/>}/>
                                <Route path='/chats' element={<h2>Chats Page</h2>} />
                                <Route path='/logout' element={<h2>Logout</h2>}/>
                                <Route path='*' element={<h2>404 Not Found</h2>}/>
                            </Routes>
                            <PostSkeleton/>
                        </>
                        : <>
                            <LoginPage/>
                        </>}
                    </BrowserRouter>
                </UserContext.Provider>
        </div> //to do call a route
    )
}

export default App
