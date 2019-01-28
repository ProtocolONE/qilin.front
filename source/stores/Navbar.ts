import { RouteConfig } from 'vue-router';

export default function NavbarStore(routes: RouteConfig[]) {
  return {
    state: {
      navbarLinks: routes.map(route => ({
        name: route.name,
        href: route.path,
      })),
    },
    getters: {},
    actions: {},
    mutations: {},
  };
}
