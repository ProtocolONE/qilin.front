export interface Notification {
  id: string;
  title: string;
  createdAt: Date;
  isRead: boolean;
  message: string;
}

export interface State {
  notifications: Notification[];
  vendorId: string;
}