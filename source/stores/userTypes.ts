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
interface Permission {
  role: string;
  domain: string;
  resource: string;
  uuid: string;
  action: string;
  allowed: boolean;
  restrictions: {
    owner: string;
    role: string;
    uuid: string;
  }
}

export default interface State {
  currentVendor: Vendor;
  user: User;
  vendors: Vendor[];
  permissions: Permission[];
}
