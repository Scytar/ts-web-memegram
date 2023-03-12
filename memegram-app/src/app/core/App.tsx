import { useState, useEffect } from 'react';
import { MemegramFeed } from '../../components/templates';
// import { makeServer } from '../../utils/mirage/mirage';
import { useQuery } from 'react-query';
import { Navbar } from '../../components/templates/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import style from './app.module.scss'
import { PostSkeleton } from '../../components/skeletons/post';
import { LoginPage } from '../../components/pages/login';
import { NewPostModal } from '../../components/templates/new-post-modal';
import MemegramIcon from '../../imgs/memegram-logo-circle.webp'
import { UserContext } from '../../contexts/userInfo';

const App = (): JSX.Element => {

    // Creates a mock server for testing using a MirageJS server
    // For more information visit https://miragejs.com/
    // This is being done by using a useEffect to start it that will turn it off if the component unmounts
    // This mock server pretends to be an actual end point and retur a Json response when called
    // TODO: remove this before deploy

    // useEffect(() => {
    //     const server = makeServer()
    //     return () => {
    //         server.shutdown()
    //     }
    // }, []);

    const [UserInfo, setUserInfo] = useState({
        token: null,
        userId: '123', //Feeds an userId for conditional rendering
    })

    useEffect(() => {
        // eslint-disable-next-line
        console.log('UserInfo',UserInfo)
    }, [UserInfo])



    // Authenticate session
    const { data, isLoading, isError } = useQuery('userInfo', () =>
        fetch('http://localhost:3030/api/userInfo')
            .then((res) => {
                return res.json();
            })
            // eslint-disable-next-line
            .catch(e => console.log(e))
    );

    useEffect(() => {
        // eslint-disable-next-line
        console.log('data', data);
        // eslint-disable-next-line
        console.log('isLoading', isLoading);
        // eslint-disable-next-line
        console.log('isError', isError);
        if (data && !isLoading && !isError) {
            setUserInfo(data.userInfo)
            // eslint-disable-next-line
            console.log('setUserInfo', data);
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
                                    <Route path='*' element={<h2>404 Not Found</h2>} />
                                </Routes>
                                <PostSkeleton />
                            </>
                            : <>
                                <LoginPage />
                            </>}
                </BrowserRouter>
            </UserContext.Provider>
        </div> //to do call a route
    )
}

export default App
