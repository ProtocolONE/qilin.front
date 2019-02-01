import { GetterTree, ActionTree, MutationTree } from 'vuex';

export interface State {

}

export default function GameStore(apiUrl: string, accessToken: string) {
    const state: State = {};
    const getters: GetterTree<State, any> = {};
    const actions: ActionTree<State, any> = {};
    const mutations: MutationTree<State> = {};
    return {
        state,
        getters,
        actions,
        mutations,
        namespaced: true,
    };
}
