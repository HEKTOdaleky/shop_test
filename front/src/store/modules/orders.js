import * as types from '../types';
import Vue from 'vue';
import axios from 'axios';
import {baseUrl} from '../../config';

const state = {
    orders: [],
    ordersPending: false,
    ordersError: false,

    oneOrder: {},
    oneOrderPending: false,
    oneOrderError: false,

    cart: {},
    cartCounter: 0
};

const getters = {
    [types.GET_ORDERS]: state => state.orders,
    [types.GET_ONE_ORDER]: state => state.oneOrder,
    [types.GET_ONE_ORDER_ERROR]: state => state.oneOrderError,
    [types.GET_USER_CART]: state => state.cart,
    [types.GET_CART_COUNTER]: state => state.cartCounter
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

        [types.ADD_ITEM_TO_CART]: (state, payload) => {
            state.cartCounter++;
            state.cart[payload.orderNum] ? state.cart[payload.orderNum].count++ : Vue.set(state.cart, payload.orderNum, {count: 1});
        },

        [types.REMOVE_ITEM_FROM_CART]: (state, payload) => {
            state.cartCounter--;
            if (state.cart[payload.orderNum]) {
                if (state.cart[payload.orderNum].count > 1) {
                    state.cart[payload.orderNum].count--
                }
                else {
                    Vue.delete(state.cart, payload.orderNum);
                }
            }
        },

    }
;

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