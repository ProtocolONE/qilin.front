interface User {
  id: string;
  nickname: string;
  avatar: string;
  lang: string;
  currency: string;
}

export default interface State {
  user: User;
}
