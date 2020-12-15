import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppNotification } from '../../interfaces'
import type { RootState } from '../../store'
import { useAppDispatch } from '../../store'
import { mainActions, removeNotification } from './main-slice'
import { Notification } from './notification'

interface NMProps {
  children: React.ReactNode
}
export const NotificationsManager = ({ children }: NMProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const [show, setShow] = useState(false)
  const [showProgress, setShowProgress] = useState(false)
  const [currentNotification, setCurrentNotification] = useState<AppNotification | false>(
    false
  )
  const firstNotification = useSelector(
    ({ main }: RootState) => main.notifications.length > 0 && main.notifications[0]
  )

  const currentProgressState = () => showProgress
  const currentNotificationContent = () => {
    return (currentNotification && currentNotification.content) || ''
  }

  const currentNotificationColor = () => {
    return (currentNotification && currentNotification.color) || 'info'
  }
  const removeCurrentNotification = (): void => {
    if (currentNotification) {
      dispatch(removeNotification(currentNotification))
    }
  }

  const hide = async () => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 1200))
    setShow(false)
  }

  const close = async () => {
    await hide()
    removeCurrentNotification()
  }

  const setNotification = async (notification: AppNotification) => {
    if (show) {
      await hide()
    }
    if (notification) {
      setCurrentNotification(notification)
      setShowProgress(notification.showProgress || false)

      setShow(true)
    } else {
      setCurrentNotification(false)
    }
  }

  useEffect(() => {
    if (firstNotification && firstNotification !== currentNotification) {
      setNotification(firstNotification)
      if (firstNotification) {
        dispatch(
          mainActions.removeNotification({
            notification: firstNotification,
            timeout: 1200
          })
        )
        close()
      }
    }
  })

  return (
    <>
      {children}
      <div className='w-full flex fixed bottom-0 justify-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-14'>
        <div className='w-full md:w-3/5 lg:w-2/3 xl:w-1/2 px-12'>
          {show ? (
            <Notification
              color={currentNotificationColor()}
              content={currentNotificationContent()}
              showProgress={currentProgressState()}
              handleClose={() => close()}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  )
}
