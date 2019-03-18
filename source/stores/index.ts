import { RouteConfig } from 'vue-router';
import MainStore from './Main';
import NavbarStore from './Navbar';
import OnBoardingStore from './OnBoarding';
import NotificationsStore from './Notifications';

export default function MainStores(apiUrl: string, routes: RouteConfig[]) {
  const Main = MainStore(apiUrl);
  const Navbar = NavbarStore(routes);
  const OnBoarding = OnBoardingStore(apiUrl);
  const Notifications = NotificationsStore(apiUrl);

  return {
    state: {
      ...Main.state,
      ...Navbar.state,
      ...OnBoarding.state,
      ...Notifications.state,
    },
    getters: {
      ...Main.getters,
      ...Navbar.getters,
      ...OnBoarding.getters,
      ...Notifications.getters,
    },
    actions: {
      ...Main.actions,
      ...Navbar.actions,
      ...OnBoarding.actions,
      ...Notifications.actions,
    },
    mutations: {
      ...Main.mutations,
      ...Navbar.mutations,
      ...OnBoarding.mutations,
      ...Notifications.mutations,
    },
  };
}
