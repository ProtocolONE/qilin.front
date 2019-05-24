import axios from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State, Package } from './types';

export default function PackageStore(apiUrl: string) {
  const state: State = {
    packageObj: null,
    foundGames: [],
  };
  const getters: GetterTree<State, any> = {
    steps: () => ['general'],
  };
  const actions: ActionTree<State, any> = {
    async initState({ commit }, packageId: string) {
      const pkg = await axios
        .get(`${apiUrl}/packages/${packageId}`)
        .then(({ data }) => data);

      commit('updatePackage', pkg);
    },
    async save({ state }) {
      await axios.put(`${apiUrl}/packages/${state.packageObj.id}`, state.packageObj);
    },
    async fetchGames({ commit }, { sort = '', query = '', vendorId }) {
      const games = await axios
        .get(`${apiUrl}/vendors/${vendorId}/games`, {
          params: {
            limit: 10,
            sort: sort || undefined,
            internalName: query || undefined
          },
        })
        .then(res => res.data || []);

      commit('updateFoundGames', games);
    },
  };
  const mutations: MutationTree<State> = {
    updatePackage: (state, value: Package) => state.packageObj = value,
    updateFoundGames: (state, value: Package) => state.foundGames = value,
  };
  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
