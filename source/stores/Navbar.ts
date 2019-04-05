import { RouteConfig } from 'vue-router';

export default function NavbarStore(routes: RouteConfig[]) {
  return {
    state: {
      navbarLinks: routes
        .filter(a => ['home', 'onBoarding', 'games', 'notifications'].indexOf(a.name) > -1)
        .map(route => ({
          name: route.name,
          href: route.path,
          titlePath: `${route.meta.i18n.replace('.meta', '')}.title`,
        })),
    },
    getters: {},
    actions: {},
    mutations: {},
  };
}
