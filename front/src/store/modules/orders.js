import * as types from '../types';
// import Vue from 'vue';
import axios from 'axios';
import {baseUrl} from '../../config';

const state = {
    orders: [],
    ordersPending: false,
    ordersError: false
};

const getters = {
    [types.GET_ORDERS]: state => state.orders,
};

const mutations = {

    [types.SAVE_ORDERS_PENDING]: (state) => {
        state.ordersPending = true;
        state.ordersError = false
    },

    [types.SAVE_ORDERS_FAILURE]: (state) => {
        state.ordersPending = false;
        state.ordersError = true
    },

    [types.SAVE_ORDERS_SUCCESS]: (state, payload) => {
        state.ordersPending = false;
        state.ordersError = false;
        state.orders = payload;
    }
};

const actions = {

    [types.FETCH_ORDERS]: (({commit}, payload) => {
        commit(types.SAVE_ORDERS_PENDING);
        return axios.request(baseUrl + 'orders', {
            method: 'get',
            params: payload
        })
            .then(response => {
                commit(types.SAVE_ORDERS_SUCCESS, response.data);
            }, error => {
                commit(types.SAVE_ORDERS_FAILURE);
            });
    })
};

export default {
    state,
    mutations,
    actions,
    getters
};