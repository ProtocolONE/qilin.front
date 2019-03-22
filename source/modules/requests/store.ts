import axios from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State } from './types';

export default function RequestsStore(apiUrl: string) {
  const state: State = {
    requests: [],
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ dispatch }) {
      await dispatch('fetchRequests');
    },
    async fetchRequests({ commit }, sort = '') {
      const requests = await axios
        .get(`${apiUrl}/vendors/reviews`, {
          params: { sort: sort || undefined },
        })
        .then(res => res.data || [
          {
            vendorId: '1',
            name: 'Company 1',
            country: 'USA',
            person: 'User 1',
            updatedAt: '2019-03-22T06:46:56Z',
            status: 'new',
          },
          {
            vendorId: '2',
            name: 'Company 2',
            country: 'USA',
            person: 'User 2',
            updatedAt: '2019-03-22T06:46:56Z',
            status: 'checking',
          },
          {
            vendorId: '3',
            name: 'Company 3',
            country: 'USA',
            person: 'User 2',
            updatedAt: '2019-03-22T06:46:56Z',
            status: 'returned',
          },
          {
            vendorId: '4',
            name: 'Company 4',
            country: 'USA',
            person: 'User 3',
            updatedAt: '2019-03-22T06:46:56Z',
            status: 'approved',
          },
        ])
        .catch(e => {
          return [
            {
              vendorId: '1',
              name: 'Company 1',
              country: 'USA',
              person: 'User 1',
              updatedAt: '2019-03-22T06:46:56Z',
              status: 'new',
            },
            {
              vendorId: '2',
              name: 'Company 2',
              country: 'USA',
              person: 'User 2',
              updatedAt: '2019-03-22T06:46:56Z',
              status: 'checking',
            },
            {
              vendorId: '3',
              name: 'Company 3',
              country: 'USA',
              person: 'User 2',
              updatedAt: '2019-03-22T06:46:56Z',
              status: 'returned',
            },
            {
              vendorId: '4',
              name: 'Company 4',
              country: 'USA',
              person: 'User 3',
              updatedAt: '2019-03-22T06:46:56Z',
              status: 'approved',
            },
          ]
        });

      commit('requests', requests);
    },
  };
  const mutations: MutationTree<State> = {
    requests: (state, value) => state.requests = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
