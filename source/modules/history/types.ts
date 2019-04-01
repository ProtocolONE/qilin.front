export interface HistoryItem {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface State {
  history: HistoryItem[];
  historyCount: number;
  rowsLimit: number;
  vendorId: string;
}
