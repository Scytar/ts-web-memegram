import { useEffect } from 'react';
import { MemegramFeed } from '../../components/templates';
import { makeServer } from '../../utils/mirage/mirage';
import { QueryClient , QueryClientProvider } from 'react-query';

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
        <div id='App-div'>
            <QueryClientProvider client={queryClient}>
                <MemegramFeed />
            </QueryClientProvider>
        </div> //to do call a route
    )
}

export default App
