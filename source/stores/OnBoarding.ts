import axios from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import State from './onBoardingTypes';

export default function OnBoardingStore(apiUrl: string) {
  const state: State = {
    vendor: null,
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async createVendor({ commit }, query) {
      const domain3 = query.name
        .toLowerCase()
        .replace(' ', '')
        .replace(/^\d+/, '');
      const name = query.name;
      const email = `${domain3}@protocol.one`;
      const howManyProducts = query.howManyProds;
      
      const vendor = await axios
        .post(
          `${apiUrl}/api/v1/vendors`,
          { name, domain3, email, howManyProducts }
        )
        .then(res => res);

      if (vendor) {
        commit('vendor', vendor);
      }
    },
  };
  const mutations: MutationTree<State> = {
    vendor: (state, value) => state.vendor = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
  };
}
