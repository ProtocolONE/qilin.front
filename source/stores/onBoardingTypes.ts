interface Vendor {
  id: string;
  name: string;
  domain3: string;
  email: string;
  manager_id: string;
  howmanyproducts: string;
}

export default interface State {
  vendor: Vendor;
}
