import * as types from '../types';
import {baseUrl} from "../../config";
import axios from "axios/index";


const state = {
    categories: [],
    categoriesPending: false,
    categoriesError: false,
};

const getters = {
    [types.GET_CATEGORIES]: state => state.categories,


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
    },

    [types.FETCH_BRAND_CATEGORIES]: ({commit}, payload) => {
        commit(types.SAVE_ALL_CATEGORIES_PENDING);
        axios.request(baseUrl + 'categories/brands',
            {
                method: 'get',
                params: {
                    brand: payload
                }
            })
            .then(resp => {
                    commit(types.SAVE_ALL_CATEGORIES_SUCCESS, resp.data);
                },
                error => {
                    commit(types.SAVE_ALL_CATEGORIES_FAILURE);
                })
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};