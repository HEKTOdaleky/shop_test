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
    [types.GET_ONE_ORDER]: state => state.oneOrder,
    [types.GET_ONE_ORDER_ERROR]: state => state.oneOrderError
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
        state.oneOrderError = null
    },

    [types.SAVE_ONE_ORDER_FAILURE]: (state, payload) => {
        state.oneOrderPending = false;
        state.oneOrderError = payload
    },

    [types.SAVE_ONE_ORDER_SUCCESS]: (state, payload) => {
        state.oneOrderPending = false;
        state.oneOrderError = null;
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
            params: {id: payload}
        })
            .then(response => {
                commit(types.SAVE_ONE_ORDER_SUCCESS, response.data);
            }, error => {
                commit(types.SAVE_ONE_ORDER_FAILURE, error.response && error.response.data);
            });
    })
};

export default {
    state,
    mutations,
    actions,
    getters
};