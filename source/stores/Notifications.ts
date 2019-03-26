import axios, {AxiosResponse} from 'axios';
import {ActionTree, GetterTree, MutationTree} from 'vuex';
import Centrifuge from 'centrifuge';
import config from '@/config';
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
    async readNotifys({ commit, getters }, messageIds) {
      if (!getters.currentVendorId) {
        return;
      }

      for (let messageId of messageIds) {
        await axios
          .put(`${apiUrl}/vendors/${getters.currentVendorId}/messages/${messageId}/read`);
        commit('setNotifyRead', messageId);
      }
    },

    async openNotify({ commit, dispatch, getters }, messageId) {
      if (!getters.currentVendorId) {
        return;
      }

      const notify: Notification = await axios
        .get(`${apiUrl}/vendors/${getters.currentVendorId}/messages/${messageId}`)
        .then( resp => resp.data );
      dispatch('readNotifys', [notify.id]);
      commit('updateSelectedNotify', notify);
    },

    async startWatchNotifications({ commit, state, getters }) {
      if (!state.user || !getters.currentVendorId) {
        return;
      }

      const resp: AxiosResponse = await axios
        .get(`${apiUrl}/vendors/${getters.currentVendorId}/messages/short`);

      if (resp.data) {
        commit('addNotifications', resp.data || []);
      }

      const token: string = resp.headers['x-centrifugo-token'];

      const centrifuge = new Centrifuge(config.centrifugeUrl);
      centrifuge.setToken(token);
      centrifuge.subscribe(`qilin:${getters.currentVendorId}`, ({ data }: { data: any }) => {
        const newMsg: NotificationShort = {
          id: data.id,
          title: data.title,
          createdAt: data.dateTime,
          isRead: false,
          haveMsg: data.body !== '',
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
