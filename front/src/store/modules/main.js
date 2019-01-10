import * as types from '../types';
// import Vue from 'vue';
import axios from 'axios';
import {baseUrl} from '../../config';

const state = {
    categories: [],
    categoriesPending: false,
    categoriesError: false,

    orders: []
};

const getters = {
    [types.GET_CATEGORIES]: state => state.categories,

    [types.GET_ORDERS]: state => state.orders
};

const mutations = {
    [types.SAVE_ALL_CATEGORIES_PENDING]: (state) => {
        state.categoriesPending = true;
        state.categoriesError = false;
    },

    [types.SAVE_ALL_CATEGORIES_FAILURE]: (state) => {
        state.categoriesPending = false;
        state.categoriesError = true;
    },

    [types.SAVE_ALL_CATEGORIES_SUCCESS]: (state, payload) => {
        state.categoriesPending = false;
        state.categoriesError = false;
        state.categories = payload;
    },
};

const actions = {
    [types.FETCH_ALL_CATEGORIES]: ({commit}) => {
        commit(types.SAVE_ALL_CATEGORIES_PENDING);
        axios.get(baseUrl + 'categories')
            .then(resp => {
                    commit(types.SAVE_ALL_CATEGORIES_SUCCESS, resp.data);
                },
                error => {
                    commit(types.SAVE_ALL_CATEGORIES_FAILURE);
                })
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};