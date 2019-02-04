import { RouteConfig } from 'vue-router';
import MainStore from './Main';
import NavbarStore from './Navbar';
import OnBoardingStore from './OnBoarding';

export default function MainStores(apiUrl: string, accessToken: string, routes: RouteConfig[]) {
  const Main = MainStore(apiUrl, accessToken);
  const Navbar = NavbarStore(routes);
  const OnBoarding = OnBoardingStore(apiUrl);

  return {
    state: {
      ...Main.state,
      ...Navbar.state,
      ...OnBoarding.state,
    },
    getters: {
      ...Main.getters,
      ...Navbar.getters,
      ...OnBoarding.getters,
    },
    actions: {
      ...Main.actions,
      ...Navbar.actions,
      ...OnBoarding.actions,
    },
    mutations: {
      ...Main.mutations,
      ...Navbar.mutations,
      ...OnBoarding.mutations,
    },
  };
}
