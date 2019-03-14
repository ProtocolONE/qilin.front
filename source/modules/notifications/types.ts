export interface Notification {
  id: string;
  title: string;
  createdAt: Date|string;
  isRead: boolean;
  message: string;
}

export interface NotificationShort {
  id: string;
  title: string;
  createdAt: Date|string;
  isRead: boolean;
  haveMsg: boolean;
}

export interface State {
  notifications: Notification[];
  vendorId: string;
  page: number;
  sort: string;
  search: string;
  itemsCount: number;
}