import { get, includes, isEmpty } from 'lodash-es';
import { RouteConfig } from 'vue-router';

export default function NavbarStore(routes: RouteConfig[]) {
  return {
    state: {},
    getters: {
      navbarLinks({ permissions }, { currentVendorId, userId }) {
        if (isEmpty(permissions) && !currentVendorId) {
          return routes
            .filter(route => includes(['home', 'onBoarding'], route.name))
            .map(route => ({
              name: route.name,
              href: route.path,
              titlePath: `${route.meta.i18n.replace('.meta', '')}.title`,
            }));
        } else if (isEmpty(permissions)) {
          return routes
            .filter(route => includes(['home', 'notifications', 'documents'], route.name))
            .map(route => ({
              name: route.name,
              href: route.path.replace(':vendorId', currentVendorId),
              titlePath: `${route.meta.i18n.replace('.meta', '')}.title`,
            }));
        }

        return routes
          .filter(route => {
            if (route.name === 'authBoard') {
              return false;
            }

            const requiresAbsenceVendor = get(route, 'meta.requiresAbsenceVendor', false);

            if (requiresAbsenceVendor && currentVendorId) {
              return false;
            }

            const requiresPermissions = get(route, 'meta.requiresPermissions', true);

            if (!requiresPermissions) {
              return true;
            }

            const module = get(route, 'meta.permissions', '');
            const permission = permissions[module];
            const allowed = get(permission, 'allowed', false);
            const action = get(permission, 'action', '');
            const hasAccess = allowed && includes(['any', 'read'], action);

            if (hasAccess) {
              return true;
            }

            return false;
          })
          .map(route => ({
            name: route.name,
            href: route.path.replace(':vendorId', currentVendorId).replace(':userId', userId),
            titlePath: `${route.meta.i18n.replace('.meta', '')}.title`,
          }));
      }
    },
    actions: {},
    mutations: {},
  };
}
