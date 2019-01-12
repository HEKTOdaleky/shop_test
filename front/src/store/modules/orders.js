import * as types from '../types';
// import Vue from 'vue';
import axios from 'axios';
import {baseUrl} from '../../config';

const state = {
    orders: [],
    ordersPending: false,
    ordersError: false,

    oneOrder: {},
    oneOrderPending: false,
    oneOrderError: false
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
    },

    [types.SAVE_ONE_ORDER_PENDING]: (state) => {
        state.oneOrderPending = true;
        state.oneOrderError = false
    },

    [types.SAVE_ONE_ORDER_FAILURE]: (state) => {
        state.oneOrderPending = false;
        state.oneOrderError = true
    },

    [types.SAVE_ONE_ORDER_SUCCESS]: (state, payload) => {
        state.oneOrderPending = false;
        state.oneOrderError = false;
        state.oneOrder = payload;
    },
};

const actions = {

    [types.FETCH_ORDERS]: (({commit}, payload) => {
        commit(types.SAVE_ORDERS_PENDING);
        const {category, brand} = payload;

        return axios.request(baseUrl + 'orders', {
            method: 'get',
            params: {category, brand}
        })
            .then(response => {
                commit(types.SAVE_ORDERS_SUCCESS, response.data);
            }, error => {
                commit(types.SAVE_ORDERS_FAILURE);
            });
    }),

    [types.FETCH_ONE_ORDER]: (({commit}, payload) => {
        commit(types.SAVE_ONE_ORDER_PENDING);

        return axios.request(baseUrl + 'orders/id', {
            method: 'get',
            params: {order: payload}
        })
            .then(response => {
                commit(types.SAVE_ONE_ORDER_SUCCESS, response.data);
            }, error => {
                commit(types.SAVE_ONE_ORDER_FAILURE);
            });
    })
};

export default {
    state,
    mutations,
    actions,
    getters
};