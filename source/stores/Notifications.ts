import axios, {AxiosResponse} from 'axios';
import {ActionTree, GetterTree, MutationTree} from 'vuex';
import Centrifuge from "centrifuge";
import { Notification, NotificationShort } from "@/modules/notifications/types";

interface State {
  isShowNotifyTip: boolean;
  notifications: NotificationShort[],
  selectedNotify: Notification;
}

export default function NotificationsStore(apiUrl: string)  {
  const state: State = {
    isShowNotifyTip: false,
    notifications: [],
    selectedNotify: null,
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async readNotifys({ commit, state }, messageIds) {
      if (!state.vendor) {
        return;
      }
      for (let messageId of messageIds) {
        await axios
          .put(`${apiUrl}/api/v1/vendors/${state.vendor.id}/messages/${messageId}/read`);
        commit('setNotifyRead', messageId);
      }
    },

    async openNotify({ commit, state, dispatch }, messageId) {
      if (!state.vendor) {
        return;
      }
      const notify: Notification = await axios
        .get(`${apiUrl}/api/v1/vendors/${state.vendor.id}/messages/${messageId}`)
        .then( resp => resp.data );
      dispatch('readNotifys', [notify.id]);
      commit('updateSelectedNotify', notify);
    },

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
      const vendorId: string = vendors[0].id;

      const resp: AxiosResponse = await axios
        .get(`${apiUrl}/api/v1/vendors/${vendorId}/messages/short`);

      if (resp.data) {
        commit('addNotifications', resp.data || []);
      }

      const token: string = resp.headers['x-centrifugo-token'];

      const centrifuge = new Centrifuge(process.env.CENTRIFUGO_URL);
      centrifuge.setToken(token);
      centrifuge.subscribe(`qilin:${vendorId}`, message => {
        const newMsg: NotificationShort = {
          id: message.data.id,
          title: message.data.title,
          createdAt: message.data.dateTime,
          isRead: false,
          haveMsg: message.data.body !== '',
        };
        commit('addNotifications', [newMsg]);
      });
      centrifuge.connect();

      if (process.env.NODE_ENV === 'development') {
        centrifuge.on('connect', (ctx: any) => {
          console.log('centrifugo connected', ctx.client);
        });
        centrifuge.on('disconnect', (ctx: any) => {
          console.log('centrifugo disconnected', ctx.reason);
        });
        centrifuge.on('disconnect', (err: any) => {
          console.log('centrifugo error', err);
        });
      }
    }
  };
  const mutations: MutationTree<State> = {
    setNotifyRead: (state, notifyId) => {
      state.notifications = state.notifications.map(n => notifyId === n.id ? {
        ...n,
        isRead: true,
      } : n );
    },
    addNotifications: (state, value) => {
      state.notifications = state.notifications.concat(value);
    },
    showNotifyTip: (state, value) => {
      state.isShowNotifyTip = value;
    },
    updateSelectedNotify: (state, value) => {
      state.selectedNotify = value;
    }
  };

  return {
    state,
    getters,
    actions,
    mutations,
  };
}
