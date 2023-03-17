// eslint-disable-next-line
import React from 'react'
import styles from './styles.module.scss';

export interface INotificationModalProps {
  notificationsInQueue: unknown,
  setChatDashboardState: unknown,
}

// eslint-disable-next-line
export default function NotificationModal({ notificationsInQueue , setChatDashboardState}: INotificationModalProps ): JSX.Element {
  return (
    <div>NotificationModal</div>
  )
}
