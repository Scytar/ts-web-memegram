import { useEffect } from 'react';
import { MemegramFeed } from '../../components/templates';
import { makeServer } from '../../utils/mirage/mirage';
import { QueryClient , QueryClientProvider } from 'react-query';
import { Navbar } from '../../components/templates/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import style from './app.module.scss'
import { PostSkeleton } from '../../components/skeletons/post';

const App = (): JSX.Element => {

    
    // Creates a mock server for testing using a MirageJS server
    // For more information visit https://miragejs.com/
    // This is being done by using a useEffect to start it that will turn it off if the component unmounts
    // This mock server pretends to be an actual end point and retur a Json response when called

    useEffect(() => {
        const server = makeServer()
        return () => {
            server.shutdown()
        }
    }, []);
        
    const queryClient = new QueryClient();
    
    return (
        <div id={style.appDiv}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Navbar/>
                    <Routes>
                        <Route path='/' element={<MemegramFeed/>}/>
                        <Route path='/chats' element={<h2>Chats Page</h2>} />
                        <Route path='/logout' element={<h2>Logout</h2>}/>
                    </Routes>
                    <PostSkeleton/>
                </BrowserRouter>
            </QueryClientProvider>
        </div> //to do call a route
    )
}

export default App
