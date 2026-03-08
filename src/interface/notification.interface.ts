export interface INotification {
  _id: string;
  recipient: any;
  type: string;
  title: string;
  message: string;
  linkId?: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface INotificationPayload {
  recipient: string;
  type: string;
  title: string;
  message: string;
  linkId?: string;
}

export interface INotificationResponse {
  _id: string;
  recipient: string;
  type: string;
  title: string;
  message: string;
  linkId?: string;
  isRead: boolean;
  createdAt: string;
}
