import VueRouter, { RouteConfig } from 'vue-router';
import UserStore from './User';
import NavbarStore from './Navbar';
import NotificationsStore from './Notifications';

export default function MainStores(apiUrl: string, router: VueRouter, routes: RouteConfig[]) {
  const User = UserStore(apiUrl, router);
  const Navbar = NavbarStore(routes);
  const Notifications = NotificationsStore(apiUrl);

  return {
    state: {
      ...User.state,
      ...Navbar.state,
      ...Notifications.state,
    },
    getters: {
      ...User.getters,
      ...Navbar.getters,
      ...Notifications.getters,
    },
    actions: {
      ...User.actions,
      ...Navbar.actions,
      ...Notifications.actions,
    },
    mutations: {
      ...User.mutations,
      ...Navbar.mutations,
      ...Notifications.mutations,
    },
  };
}
