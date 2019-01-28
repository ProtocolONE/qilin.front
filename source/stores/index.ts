import { RouteConfig } from 'vue-router';
import NavbarStore from './Navbar';

export default function MainStores(routes: RouteConfig[]) {
  const Navbar = NavbarStore(routes);

  return {
    state: {
      ...Navbar.state,
    },
    getters: {
      ...Navbar.getters,
    },
    actions: {
      ...Navbar.actions,
    },
    mutations: {
      ...Navbar.mutations,
    },
  };
}
