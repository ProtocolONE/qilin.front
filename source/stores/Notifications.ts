import axios, {AxiosResponse} from 'axios';
import {ActionTree, GetterTree, MutationTree} from 'vuex';

interface NotificationShort {
  id: string;
  title: string;
  createdAt: Date;
  isRead: boolean;
  haveMsg: boolean;
}

interface State {
  isShowNotifyTip: boolean;
  notifications: NotificationShort[],
}

export default function NotificationsStore(apiUrl: string)  {
  const state: State = {
    isShowNotifyTip: false,
    notifications: [],
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async startWatchNotifications({ commit, state }) {
      if (!state.user) {
        return;
      }
      const vendors = await axios
        .get(`${apiUrl}/api/v1/vendors`, { params: { limit: 1 } })
        .then(res => res.data || []);
      if (vendors.length) {
        commit('vendor', vendors[0]);
      }
      const resp: AxiosResponse = await axios
        .get(`${apiUrl}/api/v1/vendors/${vendors[0].id}/messages/short`);

      if (resp.data) {
        commit('addNotifications', resp.data || []);
      }
    }
  };
  const mutations: MutationTree<State> = {
    addNotifications: (state, value) => {
      state.notifications = state.notifications.concat(value);
    },
    showNotifyTip: (state, value) => {
      state.isShowNotifyTip = value;
    },
  };

  return {
    state,
    getters,
    actions,
    mutations,
  };
}
