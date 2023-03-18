import React, {useContext, createContext, useState, useEffect} from 'react'
import NotificationModal from '../../components/Thatpix-Chat/ChatIntefaceAndDashboard/NotificationModal'

const NotificationContext = createContext<any | undefined>(undefined)

export const useNotificationContext = () => {
       return useContext(NotificationContext)
}

export const NotificationContextProvider = (props:any) => {

  const [notificationState, setNotificationState] = useState([])  
  const [notificationQueue, setNotificationQueue] = useState([])

  useEffect(() => {
   // 
  }, [notificationState])


  const consumeOneNotificationFromQueue = () => {
    //
  }

  const addNotificationToQueue = (notification:any) => {
    // 
  }

  const value={    
    setNotificationState,
  }

    return(
        <NotificationContext.Provider value={value}>
        <div>  
            { false &&         
                <NotificationModal
                notificationsInQueue={undefined}
                setChatDashboardState={undefined}
                />
            }
            {props.children}
        </div>
        </NotificationContext.Provider>
    )
}

