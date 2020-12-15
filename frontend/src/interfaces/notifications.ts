enum MessageType {
  ALERT,
  INVITE,
  SESSION
}

interface Notification {
  readonly id?: number
  readonly type?: MessageType
  content: string
  readonly created_at?: number
}

export interface AppNotification extends Notification {
  color?: string
  showProgress?: boolean
}
export type CustomNotification = {
  notification?: {
    success?: AppNotification
  }
}
