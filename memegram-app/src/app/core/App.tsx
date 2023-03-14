import { useState, useEffect } from 'react';
import { MemegramFeed } from '../../components/templates';
import { Navbar } from '../../components/templates/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import style from './app.module.scss'
import { LoginPage } from '../../components/pages/login';
import { NewPostModal } from '../../components/templates/new-post-modal';
import MemegramIcon from '../../imgs/memegram-logo-circle.webp'
import { UserContext } from '../../contexts/userInfo';
// import { useWebSocket } from '../../customHooks/useWebSocket/useWebSocket';
import { IPostProps } from '../../components/organisms';
import { useQuery } from 'react-query';

const App = (): JSX.Element => {

    // eslint-disable-next-line
    const [UserInfo, setUserInfo] = useState({
        token: null,
        user: null,
        userId: null,
    })

    // {
    //     token: '987654321',
    //     user: 'TestUser',
    //     userId: '123', 
    // }

    const globalFeedSocketUrl = 'ws://127.0.0.1:3030/globalFeed';

    // eslint-disable-next-line
    const [feedState, setfeedState] = useState(null as IPostProps[] | any | null)

    // eslint-disable-next-line
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

    // eslint-disable-next-line
    function handleWebSocketConnection(ws: WebSocket): void {
        // eslint-disable-next-line
        console.log('WebSocket connection established');

        ws.addEventListener('message', function (event: MessageEvent) {
            // eslint-disable-next-line
            console.log('Received message: ' + JSON.parse(event.data));
            event.preventDefault();
            setfeedState(JSON.parse(event.data));
        });

        ws.addEventListener('close', function () {
            // eslint-disable-next-line
            console.log('WebSocket connection closed');
        });
    }

    useEffect(() => {
        if (!webSocket) {
          const ws = new WebSocket(globalFeedSocketUrl);
          setWebSocket(ws);
        } else {
            handleWebSocketConnection(webSocket);
        }
      }, [webSocket]);


    // As the react query for the socket connection starts as innitialy not loading, it`s required for us 
    // to refetch the socket connection once the user is authenticated. By refetch in this context we mean to
    // initialize the socket connection for the very first time, which is described by react query as `refetch`.
    // because react query offers state friendly updates that can trigger UI changes and useEffects hook triggers
    // we opted to use this way as the prefered way to handle the socket connection once the user is logged in.

    // eslint-disable-next-line
    // const { socket, isLoading: isSocketLoading, data: socketData, error: socketError, refetch: socketRefetch } = useWebSocket(globalFeedSocketUrl)

    useEffect(() => {
        if (UserInfo.token) {
            // socketRefetch()
        }

    }, [UserInfo])

    // For testing purposes only this useffect will let us know when socketdata and everything else 
    // from the query above gets updated
    // useEffect(() => {
    //     if (socketData) {
    //         setfeedState(socketData)
    //         // eslint-disable-next-line
    //         console.log('socketData',socketData)
    //     }

    // }, [socketData])


    // Authenticate session
    const { data, isLoading, isError } = useQuery('userInfo', () =>
        fetch('http://localhost:3030/api/userInfo/' + UserInfo.token)
            .then((res) => {
                return res.json();
            })
    );



    useEffect(() => {
        if (data && !isLoading && !isError) {
            setUserInfo(data.userInfo)
        }

    }, [data]);


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
                                    <Route path='/' element={<MemegramFeed feedItems={feedState} />} />
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
