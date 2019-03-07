import axios from 'axios';
import { filter, includes, some } from 'lodash-es';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import defaultCountries from './defaultCountries';
import defaultCurrencies from './defaultCurrencies';
import { State } from './types';

type Field = string | number | boolean;

function isFieldsEmpty(fields: Field[]): boolean {
  return !some(fields, field => field);
}

function isRequiredFieldsFilled(fields: Field[], requiredFieldsArray: string[]): boolean {
  const requiredFields: Field[] = filter(
    fields,
    (field: Field, key: string) => includes(requiredFieldsArray, key),
  );

  return !some(requiredFields, field => !field);
}

export default function DocumentsStore(apiUrl: string) {
  const state: State = {
    documents: null,
    countries: defaultCountries,
    currencies: defaultCurrencies,
    requiredFields: {
      banking: ['accountNumber', 'address', 'currency', 'name', 'swift'],
      company: ['address', 'city', 'country', 'name', 'region', 'registrationNumber', 'taxId', 'zip'],
      contact: {
        authorized: ['email', 'fullName', 'phone', 'position'],
        technical: [],
      },
    },
  };
  const getters: GetterTree<State, any> = {
    steps: ({ documents }) => documents ? ['company', 'contact', 'banking'] : [],
    disabled: ({ documents }) => documents.status !== 'draft',
    isStepFieldsEmpty: ({ documents }) => (step: string) => {
      const stepFields = documents[step];

      if (step === 'contact') {
        return isFieldsEmpty(stepFields.authorized) && isFieldsEmpty(stepFields.technical);
      }

      return isFieldsEmpty(stepFields);
    },
    isStepRequiredFieldsFilled: ({ documents, requiredFields }) => (step: string) => {
      const requiredStepFields = requiredFields[step];
      const stepFields = documents[step];

      if (step === 'contact') {
        const isAuthorizedFieldsFilled = isRequiredFieldsFilled(
          stepFields.authorized,
          requiredStepFields.authorized,
        );
        const isTechnicalFieldsFilled = isRequiredFieldsFilled(
          stepFields.technical,
          requiredStepFields.technical,
        );

        return isAuthorizedFieldsFilled && isTechnicalFieldsFilled;
      }

      return isRequiredFieldsFilled(stepFields, requiredStepFields);
    },
  };
  const actions: ActionTree<State, any> = {
    async initState({ commit }, vendorId) {
      const documents = await axios
        .get(`${apiUrl}/vendors/${vendorId}/documents`)
        .then(response => response.data);

      commit('documents', documents);
    },
    async save({ commit, state }, vendorId) {
      const documents = await axios
        .put(`${apiUrl}/vendors/${vendorId}/documents`, state.documents)
        .then(response => response.data);

      commit('documents', documents);
    },
    async toReview({ dispatch, commit }, vendorId) {
      await dispatch('save', vendorId);

      await axios
        .post(`${apiUrl}/vendors/${vendorId}/documents/reviews`)
        .then(response => response.data);

      commit('documentsToReview');
    },
    async toDraft({ commit }, vendorId) {
      await axios
        .delete(`${apiUrl}/vendors/${vendorId}/documents/reviews`)
        .then(response => response.data);

      commit('documentsToDraft');
    },
  };
  const mutations: MutationTree<State> = {
    documentsToDraft: (state) => {
      if (state.documents.status === 'on_review') {
        state.documents = {
          ...state.documents,
          status: 'draft',
        };
      }
    },
    documentsToReview: (state) => {
      if (state.documents.status === 'draft') {
        state.documents = {
          ...state.documents,
          status: 'on_review',
        };
      }
    },
    documents: (state, value) => state.documents = value,
    banking: (state, banking) => state.documents = {
      ...state.documents,
      banking: {
        ...state.documents.banking,
        ...banking,
      },
    },
    company: (state, company) => state.documents = {
      ...state.documents,
      company: {
        ...state.documents.company,
        ...company,
      },
    },
    contact: (state, contact) => state.documents = {
      ...state.documents,
      contact: {
        ...state.documents.contact,
        ...contact,
      },
    },
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
