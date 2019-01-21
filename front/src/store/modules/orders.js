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
    cartCounter: 0,

    cartOrders: [],
    cartOrdersPending: false,
    cartOrdersError: false
};

const getters = {
    [types.GET_ORDERS]: state => state.orders,
    [types.GET_ONE_ORDER]: state => state.oneOrder,
    [types.GET_ONE_ORDER_ERROR]: state => state.oneOrderError,
    [types.GET_USER_CART]: state => state.cart,
    [types.GET_CART_COUNTER]: state => state.cartCounter,
    [types.GET_ONE_ORDER_PENDING]: state => state.oneOrderPending,
    [types.GET_CART_ORDERS]: state => state.cartOrders
};

const mutations = {

    [types.SAVE_ORDERS_PENDING]: (state) => {
        state.ordersPending = true;
        state.ordersError = false;
    },

    [types.SAVE_ORDERS_FAILURE]: (state) => {
        state.ordersPending = false;
        state.ordersError = true;
    },

    [types.SAVE_ORDERS_SUCCESS]: (state, payload) => {
        state.ordersPending = false;
        state.ordersError = false;
        state.orders = payload;
    },

    [types.SAVE_ONE_ORDER_PENDING]: (state) => {
        state.oneOrderPending = true;
        state.oneOrderError = null;
    },

    [types.SAVE_ONE_ORDER_FAILURE]: (state, payload) => {
        state.oneOrderPending = false;
        state.oneOrderError = payload;
    },

    [types.SAVE_ONE_ORDER_SUCCESS]: (state, payload) => {
        state.oneOrderPending = false;
        state.oneOrderError = null;
        state.oneOrder = payload;
    },

    [types.ADD_ITEM_TO_CART]: (state, payload) => {
        state.cartCounter++;
        state.cart[payload.orderNum] ? state.cart[payload.orderNum].count++ : Vue.set(state.cart, payload.orderNum, {count: 1});
        localStorage.setItem('shop-cart', JSON.stringify({cart: state.cart, cartCounter: state.cartCounter}));
    },

    [types.REMOVE_ITEM_FROM_CART]: (state, payload) => {
        state.cartCounter--;
        if (state.cart[payload.orderNum]) {
            if (state.cart[payload.orderNum].count > 1) {
                state.cart[payload.orderNum].count--;
            } else {
                Vue.delete(state.cart, payload.orderNum);
            }
        }
        localStorage.setItem('shop-cart', JSON.stringify({cart: state.cart, cartCounter: state.cartCounter}));
    },

    [types.INITIAL_DATA_FROM_LOCAL_STORAGE]: state => {
        const storage = JSON.parse(localStorage.getItem('shop-cart'));
        if (!storage) return;

        if (storage.cart) {
            state.cart = storage.cart;
        }
        if (storage.cartCounter) {
            state.cartCounter = storage.cartCounter;
        }
    },

    [types.SAVE_CART_ORDERS_PENDING]: state => {
        state.cartOrdersPending = true;
        state.cartOrdersError = false;
    },

    [types.SAVE_CART_ORDERS_FAILURE]: state => {
        state.cartOrdersPending = false;
        state.cartOrdersError = true;
    },

    [types.SAVE_CART_ORDERS_SUCCESS]: (state, payload) => {
        state.cartOrdersPending = false;
        state.cartOrdersError = false;
        state.cartOrders = payload;
    }

};

const actions = {

    [types.FETCH_ORDERS]: ({commit}, payload) => {
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
    },

    [types.FETCH_ONE_ORDER]: ({commit}, payload) => {
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
    },

    [types.FETCH_CART_ORDERS_INFO]: ({commit, state}) => {
        commit(types.SAVE_CART_ORDERS_PENDING);


        axios.request(baseUrl + 'orders/cart-info', {
            method: 'get',
            params: {cart: Object.keys(state.cart)}
        })
            .then(response => {
                    commit(types.SAVE_CART_ORDERS_SUCCESS, response.data);
                },
                error => {
                    commit(types.SAVE_CART_ORDERS_FAILURE, error.response && error.response.data);
                });
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
