import React, {useContext, createContext, useState, useEffect, useRef} from 'react'
import NotificationModal from '../../components/Thatpix-Chat/ChatIntefaceAndDashboard/NotificationModal'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

const NotificationContext = createContext<any | undefined>(undefined)

export const useNotificationContext = () => {
       return useContext(NotificationContext)
}

export interface INotification {
  id: string,
  message: string,
  type: 'success' | 'error' | 'warning' | 'info',
  duration: 'short' | 'long', // 3s | 6s
  }

export interface NotificationProps {
  isNotificationOpenRef: React.MutableRefObject<boolean>,
  notification: INotification,
  removeNotificationFromState: (notification:INotification) => void
}

export const NotificationBox = ({notification, isNotificationOpenRef, removeNotificationFromState}:NotificationProps) => {
  // This component will be used to display the notifications in the app, is the whole box that will appear once a notification is triggered
  // this component uses the LinearProgress component to display a progress bar
  // that will be used to indicate the time left for the notification to be displayed

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // set the interval so the progress bar will be updated evenly through 3000ms or 6000ms
    // depending on the duration of the notification
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 120 ? 0 : prevProgress + 1));
    }, notification.duration === 'short' ? 30 : 60);
    return () => {
      clearInterval(timer);
    }    
  }, []);

  return(
    <div style={
      {
        position: 'absolute',
        top: '0px',     
        zIndex: 1001,  
      }
     }>
      {/* Material UI snackbar is reponsible for where the bar is going to appear, how long it will last before triggering my function and the overall aspect of the entering and leaving animation. It will attempt to trigger the onClose every X miliseconds (which is 3000 or 6000 currently on 19/03/2023). The overall appearance is not defined by him though*/}
      <Snackbar
        open={isNotificationOpenRef.current}
        anchorOrigin={{vertical:'top',horizontal:'right'}}
        autoHideDuration={notification.duration === 'short' ? 3000 : 6000}
        onClose={() => {removeNotificationFromState(notification)}}        
      >
     
        <div>
          {/* The alert is the actual notification box, it will display the message and the type of the notification 
          It is also the one that is responsible for the appearance of the notification box. For ways to style it check the documentation of the Alert component in the Material UI website.
          */}         
          <Alert variant="filled" severity={notification.type} sx={{ width: '100%' }}>      
            {notification.message}                            
          </Alert>
          <LinearProgress variant="determinate" color="inherit" value={progress} />  
        </div>
      </Snackbar>
    </div>
  )
}

export const NotificationContextProvider = (props:any) => {

  // Welcome to the notification context, this context is designed to administrate the notification system of the app.


  // This context is designed to administrate the notification system of the app
  // it will not only substitute every single ocurrence of alert() but also will
  // be used to enhance the user experience by providing a more informative and
  // interactive way to notify the user of the app's state
  // The system is designed to be used in a queue, so the notifications will be
  // able to scale after to be displayed one after the other

  const [notificationState, setNotificationState] = useState<INotification[]>([])  
  const [notificationQueueState, setNotificationQueueState] = useState<INotification[]>([])

  // the two states above are used to keep track of the notifications that are
  // currently being displayed and the ones that are waiting to be displayed
  // respectively. The notifications are displayed in a queue, so the first
  // notification in the queue is the one that is currently being displayed

  const isNotificationOpenRef = useRef(false)
  
  // the ref above is what the NotificationBox component will use to know if the 
  // small notification animation should be displayed or not

  useEffect(() => {
  // this useEffect will be used to check if the notificationState is empty or not
  // if it is empty, it will not need to set the notification to empty because
  // this behaviour is already handled by the NotificationBox component
  // if it is not empty, it will set the notification to open which will trigger the 
  // animation of the notification box which at this point was already rendered through
  // the .map but was not visible because the notification was not open
    if (notificationState.length > 0) {
      isNotificationOpenRef.current = true
    }   
  }, [notificationState])

  useEffect(() => {
    // this useEffect will be used to check if the notificationQueueState is empty or not
    // if it is empty, it will not need to do anything because there is no notification
    // to be displayed, this can happen in the very first render of the application
    // if it is not empty, it will add the first notification in the queue to the 
    // notificationState, this will trigger the useEffect above to set the notification
    // to open and the animation will be triggered
    // after that, the notification that was added to the notificationState will be removed
    // from the notificationQueueState. This logic is in place so that this notification system
    // can scale and be used to display multiple notifications one after the other in the future

    let temporaryNotificationQueueState: INotification[] = [...notificationQueueState]
    let temporaryNotificationState = [...notificationState]
    if (temporaryNotificationQueueState.length > 0) {
      temporaryNotificationState.push(temporaryNotificationQueueState[0])
      setNotificationState(temporaryNotificationState)
      temporaryNotificationQueueState.shift()
      setNotificationQueueState(temporaryNotificationQueueState)
    } 
  }, [notificationQueueState])

  const removeNotificationFromState = (notification:INotification) => {
    // function that will remove a notification from the notificationState
    // this function will be used by the NotificationBox component
    isNotificationOpenRef.current = false
    // add a delay of 300ms to the removal of the notification from the state
    // so the user can see the notification being removed from the screen
    setTimeout(() => {
      let temporaryNotificationState = [...notificationState]
      temporaryNotificationState = temporaryNotificationState.filter((item:INotification) => {
        return item.id !== notification.id
      })
      setNotificationState(temporaryNotificationState)
    }, 300)    
  }

 
  const addNotificationToQueue = (notification:INotification) => {
    // function that will add a notification to the queue
    let temporaryNotificationQueueState = [...notificationQueueState]
    temporaryNotificationQueueState.push(notification)
    setNotificationQueueState(temporaryNotificationQueueState)
  }

  
  const notify = (notification:INotification) => {
    // renaming of the function addNotificationToQueue for something shorter
    // and meaningful for the front end to use    
    addNotificationToQueue(notification)
  }

  const value={    
    notify
  }

    return(
        <NotificationContext.Provider value={value}>
        {/* The .map below is over the whole app with a z-index of 1001. Have that in mind.
        It starts with no items in it and the parent of it is a fragment so it should not interfere
        with the app if its not rendere */}
        <>  
            {notificationState.map((item:INotification) => {
              return(
                <div key={item.id}>
                  <NotificationBox 
                  isNotificationOpenRef={isNotificationOpenRef}
                  removeNotificationFromState={removeNotificationFromState}
                  notification={item}/>
                </div>
              )
            })
            }
            {props.children}
        </>
        </NotificationContext.Provider>
    )
}

