import { Route } from 'vue-router';

interface Permission {
  action: string;
}

interface Permissions {
  [resource: string]: {
    [uuid: string]: Permission;
  };
}
interface User {
  id: string;
  nickname: string;
  avatar: string;
  lang: string;
  currency: string;
}
interface Vendor {
  domain3: string;
  email: string;
  howmanyproducts: string;
  id: string;
  manager_id: string;
  name: string;
}

export default interface State {
  accessToken: string;
  currentVendor: Vendor;
  nextRoute: Route;
  permissions: Permissions;
  user: User;
  vendors: Vendor[];
}
