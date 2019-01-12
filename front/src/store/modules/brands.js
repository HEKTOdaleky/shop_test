import * as types from '../types';
import axios from 'axios';
import {baseUrl} from '../../config';

const state = {
    brands: [],
    getPending: false,
    getError: false
};

const getters = {
    [types.GET_BRANDS]: state => state.brands,
};

const mutations = {
    [types.SAVE_BRANDS_PENDING]: (state) => {
        state.getPending = true;
        state.getError = false;
    },

    [types.SAVE_BRANDS_FAILURE]: (state) => {
        state.getPending = false;
        state.getError = true;
    },

    [types.SAVE_BRANDS_SUCCESS]: (state, payload) => {
        state.getPending = false;
        state.getError = false;
        state.brands = payload;
    }
};

const actions = {
    [types.FETCH_BRANDS]: ({commit}) => {
        commit(types.SAVE_BRANDS_PENDING);

        commit(types.SAVE_ORDERS_SUCCESS, null);

        axios.get(`${baseUrl}brands`)
            .then(response => {
                commit(types.SAVE_BRANDS_SUCCESS, response.data);
            }, error => {
                commit(types.SAVE_BRANDS_FAILURE);
            })
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};